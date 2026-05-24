from datetime import date
from datetime import datetime

from decimal import Decimal

from sqlalchemy import Date
from sqlalchemy import DateTime
from sqlalchemy import Index
from sqlalchemy import Numeric
from sqlalchemy import String
from sqlalchemy import func

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.models import Base


class Employee(Base):
    __tablename__ = "employees"

    __table_args__ = (
        Index(
            "idx_employee_country_job_title",
            "country",
            "job_title",
        ),
    )

    id: Mapped[int] = mapped_column(
        primary_key=True,
    )

    full_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        index=True,
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
    )

    job_title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        index=True,
    )

    country: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        index=True,
    )

    salary: Mapped[Decimal] = mapped_column(
        Numeric(14, 2),
        nullable=False,
    )

    currency: Mapped[str] = mapped_column(
        String(10),
        nullable=False,
        index=True,
    )

    employment_status: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        index=True,
    )

    date_of_joining: Mapped[date] = mapped_column(
        Date,
        nullable=False,
        index=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
