from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import Query

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.employee import Employee

from app.schemas.salary_insights import SalaryInsightsResponse
from app.schemas.salary_insights import (
    JobTitleSalaryInsightsResponse,
)

router = APIRouter()


@router.get(
    "/salary-insights",
    response_model=SalaryInsightsResponse,
)
def get_salary_insights(
    country: str = Query(...),
    db: Session = Depends(get_db),
):
    currencies = (
        db.query(Employee.currency)
        .filter(
            Employee.country == country
        )
        .distinct()
        .all()
    )

    if not currencies:
        raise HTTPException(
            status_code=404,
            detail="No salary data found",
        )

    if len(currencies) > 1:
        raise HTTPException(
            status_code=400,
            detail=(
                "Multiple currencies found "
                "for the same country"
            ),
        )

    currency = currencies[0][0]

    result = (
        db.query(
            func.min(Employee.salary),
            func.max(Employee.salary),
            func.avg(Employee.salary),
        )
        .filter(
            Employee.country == country
        )
        .first()
    )

    minimum_salary, maximum_salary, average_salary = result

    return {
        "country": country,
        "currency": currency,
        "minimum_salary": minimum_salary,
        "maximum_salary": maximum_salary,
        "average_salary": round(
            average_salary,
            2,
        ),
    }


@router.get(
    "/salary-insights/job-title",
    response_model=(
        JobTitleSalaryInsightsResponse
    ),
)
def get_average_salary_by_job_title(
    country: str = Query(...),
    job_title: str = Query(...),
    db: Session = Depends(get_db),
):
    currencies = (
        db.query(Employee.currency)
        .filter(
            Employee.country == country
        )
        .distinct()
        .all()
    )

    if not currencies:
        raise HTTPException(
            status_code=404,
            detail="No salary data found",
        )

    if len(currencies) > 1:
        raise HTTPException(
            status_code=400,
            detail=(
                "Multiple currencies found "
                "for the same country"
            ),
        )

    currency = currencies[0][0]

    average_salary = (
        db.query(
            func.avg(Employee.salary)
        )
        .filter(
            Employee.country == country,
            Employee.job_title == job_title,
        )
        .scalar()
    )

    if average_salary is None:
        raise HTTPException(
            status_code=404,
            detail="No salary data found",
        )

    return {
        "country": country,
        "currency": currency,
        "job_title": job_title,
        "average_salary": round(
            average_salary,
            2,
        ),
    }

@router.get(
    "/salary-insights/employee-count-by-country",
)
def get_employee_count_by_country(
    db: Session = Depends(get_db),
):
    results = (
        db.query(
            Employee.country,
            func.count(Employee.id),
        )
        .group_by(Employee.country)
        .all()
    )

    return {
        country: count
        for country, count in results
    }


@router.get(
    "/salary-insights/employee-count-by-job-title",
)
def get_employee_count_by_job_title(
    db: Session = Depends(get_db),
):
    results = (
        db.query(
            Employee.job_title,
            func.count(Employee.id),
        )
        .group_by(Employee.job_title)
        .all()
    )

    return {
        job_title: count
        for job_title, count in results
    }

@router.get(
    "/salary-insights/employment-status-distribution",
)
def get_employment_status_distribution(
    db: Session = Depends(get_db),
):
    results = (
        db.query(
            Employee.employment_status,
            func.count(Employee.id),
        )
        .group_by(
            Employee.employment_status
        )
        .all()
    )

    return {
        status: count
        for status, count in results
    }

ALLOWED_FILTER_FIELDS = {
    "country": Employee.country,
    "job_title": Employee.job_title,
    "currency": Employee.currency,
    "employment_status": (
        Employee.employment_status
    ),
}

@router.get(
    "/salary-insights/filter-values",
)
def get_filter_values(
    field: str = Query(...),
    db: Session = Depends(get_db),
):
    if field not in ALLOWED_FILTER_FIELDS:
        raise HTTPException(
            status_code=400,
            detail="Invalid filter field",
        )

    column = ALLOWED_FILTER_FIELDS[field]

    results = (
        db.query(column)
        .distinct()
        .order_by(column)
        .all()
    )

    return [
        value[0]
        for value in results
        if value[0] is not None
    ]
