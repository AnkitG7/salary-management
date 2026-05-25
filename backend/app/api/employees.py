from fastapi import APIRouter
from fastapi import Depends
from fastapi import status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate
from app.schemas.employee import EmployeeResponse
from fastapi import Query
from sqlalchemy.exc import IntegrityError

from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from app.schemas.employee import EmployeeUpdate

from fastapi import Response
from sqlalchemy import or_
from app.schemas.pagination import (
    EmployeeListResponse,
)

from app.utils.validators import (
    validate_country_currency,
)

MAX_PAGE_SIZE = 50

DEFAULT_SORT_BY = "id"

DEFAULT_ORDER = "desc"


ALLOWED_SORT_FIELDS = {
    "full_name":
        Employee.full_name,

    "employment_status":
        Employee.employment_status,

    "country":
        Employee.country,

    "job_title":
        Employee.job_title,

    "date_of_joining":
        Employee.date_of_joining,
}


router = APIRouter()


@router.post(
    "/employees",
    response_model=EmployeeResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_employee(
    payload: EmployeeCreate,
    db: Session = Depends(get_db),
):
    validate_country_currency(
        payload.country,
        payload.currency,
    )
    employee = Employee(
        full_name=payload.full_name,
        email=payload.email,
        job_title=payload.job_title,
        country=payload.country,
        salary=payload.salary,
        currency=payload.currency,
        employment_status=payload.employment_status,
        date_of_joining=payload.date_of_joining,
    )

    db.add(employee)

    # db.add(employee)

    try:
        db.commit()

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=409,
            detail=(
                "Employee email already exists"
            ),
        )

    db.refresh(employee)
    return employee



@router.get(
    "/employees",

    response_model=EmployeeListResponse,

    summary="List employees",

    description="""
Retrieve employees with pagination,
sorting, searching, and filtering.

Supports:
- pagination using limit/offset
- filtering by country
- filtering by job title
- filtering by employment status
- filtering by currency
- searching by full name/email
- server-side sorting
- stable ordering

Used by:
- HR employee listing UI
- frontend pagination
- analytics filtering
""",
)
def list_employees(
    limit: int = Query(
        default=10,
        ge=1,
        description=(
            "Maximum number of "
            "employees to return"
        ),
    ),

    offset: int = Query(
        default=0,
        ge=0,
        description=(
            "Number of employees "
            "to skip for pagination"
        ),
    ),

    country: str | None = Query(
        default=None,
        description=(
            "Filter employees "
            "by country"
        ),
    ),

    job_title: str | None = Query(
        default=None,
        description=(
            "Filter employees "
            "by job title"
        ),
    ),

    employment_status: str | None = Query(
        default=None,
        description=(
            "Filter employees "
            "by employment status"
        ),
    ),

    currency: str | None = Query(
        default=None,
        description=(
            "Filter employees "
            "by currency"
        ),
    ),

    search: str | None = Query(
        default=None,
        description=(
            "Search employees by "
            "full name or email"
        ),
    ),

    sort_by: str = Query(
        default=DEFAULT_SORT_BY,
        description=(
            "Field used for sorting"
        ),
    ),

    order: str = Query(
        default=DEFAULT_ORDER,
        description=(
            "Sorting order: "
            "asc or desc"
        ),
    ),

    db: Session = Depends(get_db),
):
    limit = min(
        limit,
        MAX_PAGE_SIZE,
    )

    if (
        sort_by != "id"
        and sort_by
        not in ALLOWED_SORT_FIELDS
    ):
        raise HTTPException(
            status_code=400,
            detail="Invalid sort field",
        )

    if order not in {
        "asc",
        "desc",
    }:
        raise HTTPException(
            status_code=400,
            detail="Invalid sort order",
        )

    query = db.query(Employee)

    # -------------------------
    # Normalize Inputs
    # -------------------------

    if country:
        country = (
            country
            .strip()
            .lower()
        )

    if job_title:
        job_title = (
            job_title
            .strip()
            .lower()
        )

    if employment_status:
        employment_status = (
            employment_status
            .strip()
            .upper()
        )

    if currency:
        currency = (
            currency
            .strip()
            .upper()
        )

    if search:
        search = (
            search
            .strip()
            .lower()
        )

    # -------------------------
    # Apply Filters
    # -------------------------

    if country:
        query = query.filter(
            Employee.country
            == country
        )

    if job_title:
        query = query.filter(
            Employee.job_title
            == job_title
        )

    if employment_status:
        query = query.filter(
            Employee.employment_status
            == employment_status
        )

    if currency:
        query = query.filter(
            Employee.currency
            == currency
        )

    # -------------------------
    # Apply Search
    # -------------------------

    if search:
        search_term = (
            f"%{search}%"
        )

        query = query.filter(
            or_(
                Employee.full_name.ilike(
                    search_term
                ),
                Employee.email.ilike(
                    search_term
                ),
            )
        )

    total = query.count()

    # -------------------------
    # Apply Sorting
    # -------------------------

    if sort_by == "id":
        sort_column = Employee.id
    else:
        sort_column = (
            ALLOWED_SORT_FIELDS[
                sort_by
            ]
        )

    if order == "asc":
        query = query.order_by(
            sort_column.asc(),
            Employee.id.asc(),
        )
    else:
        query = query.order_by(
            sort_column.desc(),
            Employee.id.desc(),
        )

    # -------------------------
    # Apply Pagination
    # -------------------------

    employees = (
        query
        .offset(offset)
        .limit(limit)
        .all()
    )

    return {
        "items": employees,
        "total": total,
    }


@router.get(
    "/employees/{employee_id}",
    response_model=EmployeeResponse,
)
def get_employee(
    employee_id: int,
    db: Session = Depends(get_db),
):
    employee = (
        db.query(Employee)
        .filter(
            Employee.id
            == employee_id
        )
        .first()
    )

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found",
        )

    return employee


@router.patch(
    "/employees/{employee_id}",
    response_model=EmployeeResponse,
)
def update_employee(
    employee_id: int,
    payload: EmployeeUpdate,
    db: Session = Depends(get_db),
):
    employee = db.get(
        Employee,
        employee_id,
    )

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found",
        )

    update_data = payload.model_dump(
        exclude_unset=True
    )

    updated_country = update_data.get(
        "country",
        employee.country,
    )

    updated_currency = update_data.get(
        "currency",
        employee.currency,
    )

    validate_country_currency(
        updated_country,
        updated_currency,
        )

    for field, value in update_data.items():
        setattr(
            employee,
            field,
            value,
        )

    try:
        db.commit()

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=400,
            detail="Employee update violates database constraints",
        )

    db.refresh(employee)

    return employee


@router.delete(
    "/employees/{employee_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_employee(
    employee_id: int,
    db: Session = Depends(get_db),
):
    employee = db.get(
        Employee,
        employee_id,
    )

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found",
        )

    db.delete(employee)

    db.commit()

    return Response(
        status_code=status.HTTP_204_NO_CONTENT
    )
