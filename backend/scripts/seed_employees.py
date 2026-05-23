import random
import time
from pathlib import Path
import uuid

from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.employee import Employee


TOTAL_EMPLOYEES = 10_000

BATCH_SIZE = 1_000


JOB_TITLES = [
    "software engineer",
    "backend engineer",
    "frontend engineer",
    "devops engineer",
    "data engineer",
    "cloud architect",
    "product manager",
]

COUNTRIES_AND_CURRENCIES = [
    ("india", "INR"),
    ("united states", "USD"),
    ("canada", "CAD"),
    ("germany", "EUR"),
    ("japan", "JPY"),
]

EMPLOYMENT_STATUSES = [
    "ACTIVE",
    "CONTRACT",
    "PART_TIME",
]


BASE_DIR = Path(__file__).resolve().parent.parent

FIRST_NAMES_FILE = (
    BASE_DIR / "data" / "first_names.txt"
)

LAST_NAMES_FILE = (
    BASE_DIR / "data" / "last_names.txt"
)


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


def generate_employee(
    employee_number: int,
    first_names: list[str],
    last_names: list[str],
) -> Employee:
    first_name = random.choice(
        first_names
    )

    last_name = random.choice(
        last_names
    )

    full_name = (
        f"{first_name.title()} "
        f"{last_name.title()}"
    )

    country, currency = random.choice(
        COUNTRIES_AND_CURRENCIES
    )

    # email = (
    #     f"{first_name}."
    #     f"{last_name}."
    #     f"{employee_number}"
    #     "@example.com"
    # )
    unique_suffix = (
        uuid.uuid4().hex[:8]
    )

    email = (
        f"{first_name}."
        f"{last_name}."
        f"{employee_number}."
        f"{unique_suffix}"
        "@example.com"
    )

    return Employee(
        full_name=full_name,
        email=email,
        job_title=random.choice(
            JOB_TITLES
        ),
        country=country,
        salary=random.randint(
            50_000,
            5_000_000,
        ),
        currency=currency,
        employment_status=random.choice(
            EMPLOYMENT_STATUSES
        ),
        date_of_joining=(
            f"{random.randint(2020, 2025)}"
            f"-{random.randint(1,12):02d}"
            f"-{random.randint(1,28):02d}"
        ),
    )


def seed_employees():
    start_time = time.perf_counter()

    first_names = load_names(
        FIRST_NAMES_FILE
    )

    last_names = load_names(
        LAST_NAMES_FILE
    )

    db: Session = SessionLocal()

    try:
        for batch_start in range(
            0,
            TOTAL_EMPLOYEES,
            BATCH_SIZE,
        ):
            employees = []

            for employee_number in range(
                batch_start,
                batch_start + BATCH_SIZE,
            ):
                employee = generate_employee(
                    employee_number=(
                        employee_number
                    ),
                    first_names=first_names,
                    last_names=last_names,
                )

                employees.append(employee)

            db.bulk_save_objects(
                employees
            )

            db.commit()

            print(
                f"Inserted "
                f"{batch_start + BATCH_SIZE}"
                f"/{TOTAL_EMPLOYEES}"
            )

    finally:
        db.close()

    end_time = time.perf_counter()

    total_time = (
        end_time - start_time
    )

    print(
        f"\nFinished seeding "
        f"{TOTAL_EMPLOYEES} employees "
        f"in {total_time:.2f} seconds"
    )


if __name__ == "__main__":
    seed_employees()
