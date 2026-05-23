from datetime import date

from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import Field


class EmployeeCreate(BaseModel):
    full_name: str = Field(
        min_length=1,
        max_length=255,
    )

    email: EmailStr

    job_title: str = Field(
        min_length=1,
        max_length=255,
    )

    country: str = Field(
        min_length=1,
        max_length=100,
    )

    salary: int = Field(gt=0)

    currency: str = Field(
        min_length=1,
        max_length=10,
    )

    employment_status: str = Field(
        min_length=1,
        max_length=50,
    )

    date_of_joining: date


class EmployeeResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    job_title: str
    country: str
    salary: int
    currency: str
    employment_status: str
    date_of_joining: date

    model_config = {
        "from_attributes": True
    }
