from pydantic import BaseModel


class SalaryInsightsResponse(BaseModel):
    country: str

    currency: str

    minimum_salary: int

    maximum_salary: int

    average_salary: float


class JobTitleSalaryInsightsResponse(BaseModel):
    country: str

    currency: str

    job_title: str

    average_salary: float
