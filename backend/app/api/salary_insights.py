from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Query,
)

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.employee import Employee
from app.schemas.salary_insights import (
    JobTitleSalaryInsightsResponse,
    SalaryInsightsResponse,
)


# Create salary insights router
router = APIRouter()


# Get salary statistics by country
@router.get(
    "/salary-insights",
    response_model=SalaryInsightsResponse,
    summary=(
        "Get salary statistics "
        "for a country"
    ),
    description="""
Retrieve:
- minimum salary
- maximum salary
- average salary

for employees within a country.

Used by:
- HR analytics dashboard
- compensation analysis
""",
)
def get_salary_insights(
    country: str = Query(...),
    db: Session = Depends(get_db),
):

    # Normalize country value
    country = (
        country
        .strip()
        .lower()
    )

    # Fetch distinct currencies for country
    currencies = (
        db.query(Employee.currency)
        .filter(
            Employee.country == country
        )
        .distinct()
        .all()
    )

    # Raise error if no salary data exists
    if not currencies:

        raise HTTPException(
            status_code=404,
            detail="No salary data found",
        )

    # Prevent analytics on mixed currencies
    if len(currencies) > 1:

        raise HTTPException(
            status_code=400,
            detail=(
                "Multiple currencies found "
                "for the same country"
            ),
        )

    currency = currencies[0][0]

    # Calculate salary statistics
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

    (
        minimum_salary,
        maximum_salary,
        average_salary,
    ) = result

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


# Get average salary by country and job title
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

    # Normalize country value
    country = (
        country
        .strip()
        .lower()
    )

    # Normalize job title value
    job_title = (
        job_title
        .strip()
        .lower()
    )

    # Fetch distinct currencies for country
    currencies = (
        db.query(Employee.currency)
        .filter(
            Employee.country == country
        )
        .distinct()
        .all()
    )

    # Raise error if no salary data exists
    if not currencies:

        raise HTTPException(
            status_code=404,
            detail="No salary data found",
        )

    # Prevent analytics on mixed currencies
    if len(currencies) > 1:

        raise HTTPException(
            status_code=400,
            detail=(
                "Multiple currencies found "
                "for the same country"
            ),
        )

    currency = currencies[0][0]

    # Calculate average salary
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

    # Raise error if no matching salary data exists
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


# Get employee count grouped by country
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


# Get employee count grouped by job title
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


# Get employee distribution by employment status
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


# Allowed fields for filter values endpoint
ALLOWED_FILTER_FIELDS = {
    "country": Employee.country,
    "job_title": Employee.job_title,
    "currency": Employee.currency,
    "employment_status": (
        Employee.employment_status
    ),
}


# Get distinct values for supported filter fields
@router.get(
    "/salary-insights/filter-values",
)
def get_filter_values(
    field: str = Query(...),
    db: Session = Depends(get_db),
):

    # Normalize field value
    field = (
        field
        .strip()
        .lower()
    )

    # Validate requested field
    if field not in ALLOWED_FILTER_FIELDS:

        raise HTTPException(
            status_code=400,
            detail="Invalid filter field",
        )

    column = ALLOWED_FILTER_FIELDS[field]

    # Fetch unique values for field
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
