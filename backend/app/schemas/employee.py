from datetime import date

from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import Field
from pydantic import field_validator
from decimal import Decimal


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

    # salary: int = Field(gt=0)
    salary: Decimal = Field(gt=0)

    currency: str = Field(
        min_length=1,
        max_length=10,
    )

    employment_status: str = Field(
        min_length=1,
        max_length=50,
    )

    date_of_joining: date

    @field_validator(
    "country",
    "job_title",
    mode="before",
    )

    @classmethod
    def normalize_lowercase_fields(
        cls,
        value: str,
    ) -> str:
        return value.strip().lower()

    @field_validator(
    "currency",
    "employment_status",
    mode="before",
    )

    @classmethod
    def normalize_uppercase_fields(
        cls,
        value: str,
    ) -> str:
        return value.strip().upper()

    @field_validator(
    "email",
    mode="before",
    )
    @classmethod
    def normalize_email(
        cls,
        value: str,
    ) -> str:
        return value.strip().lower()

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

    # salary: int | None = Field(
    #     default=None,
    #     gt=0,
    # )
    salary: Decimal | None = Field(
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

    @field_validator(
    "country",
    "job_title",
    mode="before",
    )

    @classmethod
    def normalize_lowercase_fields(
        cls,
        value: str,
    ) -> str:
        return value.strip().lower()

    @field_validator(
    "currency",
    "employment_status",
    mode="before",
    )

    @classmethod
    def normalize_uppercase_fields(
        cls,
        value: str,
    ) -> str:
        return value.strip().upper()

    @field_validator(
    "email",
    mode="before",
    )
    @classmethod
    def normalize_email(
        cls,
        value: str,
    ) -> str:
        return value.strip().lower()


class EmployeeResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    job_title: str
    country: str
    # salary: int
    salary: Decimal
    currency: str
    employment_status: str
    date_of_joining: date

    model_config = {
        "from_attributes": True
    }
