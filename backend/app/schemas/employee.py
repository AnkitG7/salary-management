from datetime import date

from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import Field
from pydantic import field_validator
from decimal import Decimal

from app.utils.normalization import (
    normalize_lowercase,
    normalize_uppercase,
)


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
        return normalize_lowercase(value)

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
        return normalize_lowercase(value)

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
        # return value.strip().upper()
        return normalize_uppercase(value)

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
        "from_attributes": True,

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
