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

from app.schemas.pagination import (
    EmployeeListResponse,
)


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


# @router.get(
#     "/employees",
#     # response_model=list[EmployeeResponse],
#     response_model=EmployeeListResponse,

# )
@router.get(
    "/employees",

    response_model=EmployeeListResponse,

    summary="List employees",

    description="""
Retrieve employees with pagination and optional filtering.

Supports:
- pagination using limit/offset
- filtering by country
- filtering by job title

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
        le=100,
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
    db: Session = Depends(get_db),
):
    query = db.query(Employee)
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
    if country:
        query = query.filter(
            Employee.country == country
        )

    if job_title:
        query = query.filter(
            Employee.job_title == job_title
        )

    # employees = (
    #     query
    #     .order_by(Employee.id)
    #     .offset(offset)
    #     .limit(limit)
    #     .all()
    # )

    # return employees
    total = query.count()

    employees = (
        query
        .order_by(Employee.id)
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
