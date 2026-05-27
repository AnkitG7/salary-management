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

# Number of records inserted per batch
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


# Common email domains for generated employees
DOMAINS = [
    "gmail.com", "yahoo.com", "outlook.com", "hotmail.com",
    "icloud.com", "proton.me", "aol.com", "zoho.com",
    "yandex.com", "mail.com", "microsoft.com", "amazon.com",
    "apple.com", "google.com", "ibm.com"
]


# Weighted country distribution
COUNTRY_WEIGHTS = [40, 25, 15, 10, 10]

# Weighted employment status distribution
STATUS_WEIGHTS = [60, 15, 15, 10]

# Weighted job title distribution
JOB_WEIGHTS = [35, 20, 15, 10, 10, 5, 5]


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
    first_names: list[str],
    last_names: list[str],
) -> Employee:

    first_name = random.choice(first_names)

    last_name = random.choice(last_names)

    full_name = (
        f"{first_name.title()} "
        f"{last_name.title()}"
    )

    # Select country using weighted distribution
    country, currency = random.choices(
        COUNTRIES_AND_CURRENCIES,
        weights=COUNTRY_WEIGHTS,
        k=1
    )[0]

    # Select employment status using weighted distribution
    status = random.choices(
        EMPLOYMENT_STATUSES,
        weights=STATUS_WEIGHTS,
        k=1
    )[0]

    # Select job title using weighted distribution
    job = random.choices(
        JOB_TITLES,
        weights=JOB_WEIGHTS,
        k=1
    )[0]

    # Generate unique employee email
    domain = random.choice(DOMAINS)

    unique_suffix = uuid.uuid4().hex[:5]

    email = (
        f"{first_name[0]}."
        f"{last_name}_"
        f"{unique_suffix}"
        f"@{domain}"
    ).lower()

    return Employee(
        full_name=full_name,

        email=email,

        job_title=job,

        country=country,

        salary=random.randint(
            30_000,
            5_000_000,
        ),

        currency=currency,

        employment_status=status,

        date_of_joining=date(
            random.randint(1995, 2025),
            random.randint(1, 12),
            random.randint(1, 28)
        ),
    )


# Seed employee records into database
def seed_employees():

    start_time = time.perf_counter()

    # Load first and last names datasets
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

            end_range = min(
                batch_start + BATCH_SIZE,
                TOTAL_EMPLOYEES,
            )

            # Generate employee batch
            for _ in range(
                batch_start,
                end_range,
            ):

                employee = generate_employee(
                    first_names=first_names,
                    last_names=last_names,
                )

                employees.append(employee)

            # Bulk insert employees
            db.bulk_save_objects(employees)

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

    # Print final execution summary
    print(
        f"\nFinished seeding "
        f"{TOTAL_EMPLOYEES} employees "
        f"in {total_time:.2f} seconds"
    )


# Run seeding script directly
if __name__ == "__main__":
    seed_employees()
