from pydantic import BaseModel


# Response schema for country salary insights
class SalaryInsightsResponse(BaseModel):

    country: str

    currency: str

    minimum_salary: int

    maximum_salary: int

    average_salary: float


# Response schema for job title salary insights
class JobTitleSalaryInsightsResponse(BaseModel):

    country: str

    currency: str

    job_title: str

    average_salary: float
