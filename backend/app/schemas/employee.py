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

class EmployeeUpdate(BaseModel):
    full_name: str | None = Field(
        default=None,
        min_length=1,
        max_length=255,
    )

    email: EmailStr | None = None

    job_title: str | None = Field(
        default=None,
        min_length=1,
        max_length=255,
    )

    country: str | None = Field(
        default=None,
        min_length=1,
        max_length=100,
    )

    salary: int | None = Field(
        default=None,
        gt=0,
    )

    currency: str | None = Field(
        default=None,
        min_length=1,
        max_length=10,
    )

    employment_status: str | None = Field(
        default=None,
        min_length=1,
        max_length=50,
    )

    date_of_joining: date | None = None

    
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
