from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import Query

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.employee import Employee
from app.schemas.salary_insights import SalaryInsightsResponse


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
