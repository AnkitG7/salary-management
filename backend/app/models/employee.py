from datetime import date, datetime
from decimal import Decimal

from sqlalchemy import (
    Date,
    DateTime,
    Index,
    Numeric,
    String,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.models import Base


# Employee database model
class Employee(Base):
    __tablename__ = "employees"

    # Composite index for optimized country + job title filtering
    __table_args__ = (
        Index(
            "idx_employee_country_job_title",
            "country",
            "job_title",
        ),
    )

    # Primary key
    id: Mapped[int] = mapped_column(
        primary_key=True,
    )

    # Employee full name
    full_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        index=True,
    )

    # Unique employee email address
    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
    )

    # Employee job title
    job_title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        index=True,
    )

    # Employee country
    country: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        index=True,
    )

    # Employee salary amount
    salary: Mapped[Decimal] = mapped_column(
        Numeric(14, 2),
        nullable=False,
    )

    # Salary currency code
    currency: Mapped[str] = mapped_column(
        String(10),
        nullable=False,
        index=True,
    )

    # Employment type/status
    employment_status: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        index=True,
    )

    # Employee joining date
    date_of_joining: Mapped[date] = mapped_column(
        Date,
        nullable=False,
        index=True,
    )

    # Record creation timestamp
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    # Record last update timestamp
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
