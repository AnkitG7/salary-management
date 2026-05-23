from fastapi import APIRouter
from fastapi import Depends
from fastapi import status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate
from app.schemas.employee import EmployeeResponse
from fastapi import Query


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

    db.commit()

    db.refresh(employee)

    return employee


@router.get(
    "/employees",
    response_model=list[EmployeeResponse],
)
def list_employees(
    limit: int = Query(
        default=10,
        ge=1,
        le=100,
    ),
    offset: int = Query(
        default=0,
        ge=0,
    ),
    country: str | None = None,
    job_title: str | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(Employee)

    if country:
        query = query.filter(
            Employee.country == country
        )

    if job_title:
        query = query.filter(
            Employee.job_title == job_title
        )

    employees = (
        query
        .order_by(Employee.id)
        .offset(offset)
        .limit(limit)
        .all()
    )

    return employees
