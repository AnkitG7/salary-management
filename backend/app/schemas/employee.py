from datetime import date
from decimal import Decimal

from pydantic import (
    BaseModel,
    EmailStr,
    Field,
    field_validator,
)

from app.utils.normalization import (
    normalize_lowercase,
    normalize_uppercase,
)


# Schema for employee creation request
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

    # Employee salary amount
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

    # Normalize lowercase fields
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

        return normalize_lowercase(value)

    # Normalize uppercase fields
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

        return normalize_uppercase(value)

    # Normalize email field
    @field_validator(
        "email",
        mode="before",
    )
    @classmethod
    def normalize_email(
        cls,
        value: str,
    ) -> str:

        return normalize_lowercase(value)

    # Swagger example payload
    model_config = {
        "json_schema_extra": {
            "example": {
                "full_name":
                    "Aarav Sharma",

                "email":
                    "aarav@example.com",

                "job_title":
                    "backend engineer",

                "country":
                    "india",

                "salary":
                    "2500000.00",

                "currency":
                    "INR",

                "employment_status":
                    "FULL_TIME",

                "date_of_joining":
                    "2024-01-15",
            }
        }
    }


# Schema for employee update request
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

    # Optional employee salary update
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

    # Normalize lowercase fields
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

        return normalize_lowercase(value)

    # Normalize uppercase fields
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

        return normalize_uppercase(value)

    # Normalize email field
    @field_validator(
        "email",
        mode="before",
    )
    @classmethod
    def normalize_email(
        cls,
        value: str,
    ) -> str:

        return normalize_lowercase(value)

    # Swagger example payload
    model_config = {
        "json_schema_extra": {
            "example": {
                "salary":
                    "3000000.00",

                "job_title":
                    "staff engineer",
            }
        }
    }


# Schema for employee response payload
class EmployeeResponse(BaseModel):

    id: int

    full_name: str

    email: EmailStr

    job_title: str

    country: str

    salary: Decimal

    currency: str

    employment_status: str

    date_of_joining: date

    model_config = {
        # Enable ORM model serialization
        "from_attributes": True,

        # Swagger example response
        "json_schema_extra": {
            "example": {
                "id": 1,

                "full_name":
                    "Aarav Sharma",

                "email":
                    "aarav@example.com",

                "job_title":
                    "backend engineer",

                "country":
                    "india",

                "salary":
                    "2500000.00",

                "currency":
                    "INR",

                "employment_status":
                    "FULL_TIME",

                "date_of_joining":
                    "2024-01-15",
            }
        }
    }
