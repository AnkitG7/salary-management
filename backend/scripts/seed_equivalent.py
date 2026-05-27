import random
import time
import uuid
from datetime import date
from pathlib import Path

from sqlalchemy.orm import Session

from app.core.constants import (
    COUNTRIES_AND_CURRENCIES,
    EMPLOYMENT_STATUSES,
    JOB_TITLES,
)
from app.core.database import SessionLocal
from app.models.employee import Employee


# Total number of employees to seed
TOTAL_EMPLOYEES = 10_000

# Number of employees inserted per batch
BATCH_SIZE = 1_000


# Base project directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Path to first names dataset
FIRST_NAMES_FILE = (
    BASE_DIR / "data" / "first_names.txt"
)

# Path to last names dataset
LAST_NAMES_FILE = (
    BASE_DIR / "data" / "last_names.txt"
)


# Load names from text file
def load_names(file_path: Path) -> list[str]:

    with open(
        file_path,
        "r",
        encoding="utf-8",
    ) as file:

        return [
            line.strip().lower()
            for line in file.readlines()
            if line.strip()
        ]


# Generate random employee record
def generate_employee(
    employee_number: int,
    first_names: list[str],
    last_names: list[str],
) -> Employee:

    first_name = random.choice(first_names)

    last_name = random.choice(last_names)

    full_name = (
        f"{first_name.title()} "
        f"{last_name.title()}"
    )

    # Randomly select country and matching currency
    country, currency = random.choice(
        COUNTRIES_AND_CURRENCIES
    )

    # Generate unique email address
    unique_suffix = uuid.uuid4().hex[:8]

    email = (
        f"{first_name}.{last_name}."
        f"{employee_number}."
        f"{unique_suffix}@example.com"
    )

    return Employee(
        full_name=full_name,

        email=email,

        # Randomly assign job title
        job_title=random.choice(
            JOB_TITLES
        ),

        country=country,

        # Generate random salary value
        salary=random.randint(
            50_000,
            5_000_000,
        ),

        currency=currency,

        # Randomly assign employment status
        employment_status=random.choice(
            EMPLOYMENT_STATUSES
        ),

        # Generate random joining date
        date_of_joining=date(
            random.randint(1990, 2025),
            random.randint(1, 12),
            random.randint(1, 28)
        ),
    )


# Seed employee records into database
def seed_employees():

    start_time = time.perf_counter()

    # Load names datasets
    first_names = load_names(
        FIRST_NAMES_FILE
    )

    last_names = load_names(
        LAST_NAMES_FILE
    )

    # Create database session
    db: Session = SessionLocal()

    try:
        for batch_start in range(
            0,
            TOTAL_EMPLOYEES,
            BATCH_SIZE,
        ):

            employees = []

            # Prevent batch overflow
            end_range = min(
                batch_start + BATCH_SIZE,
                TOTAL_EMPLOYEES,
            )

            # Generate employee batch
            for employee_number in range(
                batch_start,
                end_range,
            ):

                employee = generate_employee(
                    employee_number=employee_number,
                    first_names=first_names,
                    last_names=last_names,
                )

                employees.append(employee)

            # Bulk insert employee records
            db.bulk_save_objects(
                employees
            )

            db.commit()

            print(
                f"Inserted "
                f"{end_range}/"
                f"{TOTAL_EMPLOYEES}"
            )

    finally:
        # Close database session
        db.close()

    end_time = time.perf_counter()

    total_time = end_time - start_time

    # Print execution summary
    print(
        f"\nFinished seeding "
        f"{TOTAL_EMPLOYEES} employees "
        f"in {total_time:.2f} seconds"
    )


# Run seeder script directly
if __name__ == "__main__":
    seed_employees()
