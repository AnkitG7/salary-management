from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Query,
    Response,
    status,
)

from sqlalchemy import (
    func,
    or_,
)
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.employee import Employee
from app.schemas.employee import (
    EmployeeCreate,
    EmployeeResponse,
    EmployeeUpdate,
)
from app.schemas.pagination import (
    EmployeeListResponse,
)
from app.utils.validators import (
    validate_country_currency,
)


# Maximum allowed page size
MAX_PAGE_SIZE = 50

# Default sorting field
DEFAULT_SORT_BY = "id"

# Default sorting order
DEFAULT_ORDER = "desc"


# Supported sortable fields
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


# Fields requiring case-insensitive sorting
STRING_SORT_FIELDS = {
    "full_name",
    "employment_status",
    "country",
    "job_title",
}


# Create employee router
router = APIRouter()


# Create new employee
@router.post(
    "/employees",
    response_model=EmployeeResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_employee(
    payload: EmployeeCreate,
    db: Session = Depends(get_db),
):

    # Validate country-currency mapping
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

    try:
        db.commit()

    except IntegrityError:

        db.rollback()

        # Handle duplicate email constraint
        raise HTTPException(
            status_code=409,
            detail=(
                "Employee email already exists"
            ),
        )

    db.refresh(employee)

    return employee


# List employees with pagination and filtering
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

    # Enforce maximum page size
    limit = min(
        limit,
        MAX_PAGE_SIZE,
    )

    # Validate sorting field
    if (
        sort_by != "id"
        and sort_by
        not in ALLOWED_SORT_FIELDS
    ):

        raise HTTPException(
            status_code=400,
            detail="Invalid sort field",
        )

    # Validate sorting order
    if order not in {
        "asc",
        "desc",
    }:

        raise HTTPException(
            status_code=400,
            detail="Invalid sort order",
        )

    query = db.query(Employee)

    # Normalize country filter
    if country:
        country = (
            country
            .strip()
            .lower()
        )

    # Normalize job title filter
    if job_title:
        job_title = (
            job_title
            .strip()
            .lower()
        )

    # Normalize employment status filter
    if employment_status:
        employment_status = (
            employment_status
            .strip()
            .upper()
        )

    # Normalize currency filter
    if currency:
        currency = (
            currency
            .strip()
            .upper()
        )

    # Normalize search query
    if search:
        search = (
            search
            .strip()
            .lower()
        )

    # Apply country filter
    if country:
        query = query.filter(
            Employee.country
            == country
        )

    # Apply job title filter
    if job_title:
        query = query.filter(
            Employee.job_title
            == job_title
        )

    # Apply employment status filter
    if employment_status:
        query = query.filter(
            Employee.employment_status
            == employment_status
        )

    # Apply currency filter
    if currency:
        query = query.filter(
            Employee.currency
            == currency
        )

    # Apply search filter
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

    # Get total matching records
    total = query.count()

    # Resolve sorting column
    if sort_by == "id":
        sort_column = Employee.id
    else:
        sort_column = (
            ALLOWED_SORT_FIELDS[
                sort_by
            ]
        )

    # Apply case-insensitive sorting for string fields
    if sort_by in STRING_SORT_FIELDS:
        sort_expr = func.lower(
            sort_column
        )
    else:
        sort_expr = sort_column

    # Apply sorting order
    if order == "asc":

        query = query.order_by(
            sort_expr.asc(),
            Employee.id.asc(),
        )

    else:

        query = query.order_by(
            sort_expr.desc(),
            Employee.id.desc(),
        )

    # Apply pagination
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


# Get employee by ID
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

    # Raise error if employee does not exist
    if not employee:

        raise HTTPException(
            status_code=404,
            detail="Employee not found",
        )

    return employee


# Update employee record
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

    # Raise error if employee does not exist
    if not employee:

        raise HTTPException(
            status_code=404,
            detail="Employee not found",
        )

    update_data = payload.model_dump(
        exclude_unset=True
    )

    # Resolve updated country value
    updated_country = update_data.get(
        "country",
        employee.country,
    )

    # Resolve updated currency value
    updated_currency = update_data.get(
        "currency",
        employee.currency,
    )

    # Validate updated country-currency mapping
    validate_country_currency(
        updated_country,
        updated_currency,
    )

    # Apply field updates
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

        # Handle database constraint violations
        raise HTTPException(
            status_code=400,
            detail=(
                "Employee update violates "
                "database constraints"
            ),
        )

    db.refresh(employee)

    return employee


# Delete employee record
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

    # Raise error if employee does not exist
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
