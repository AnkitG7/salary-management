from fastapi.testclient import TestClient

from app.main import app
from decimal import Decimal


client = TestClient(app)


def test_update_employee_salary():
    import uuid

    email = f"rohit{uuid.uuid4().hex[:6]}@example.com"
    create_payload = {
        "full_name": "Rohit Sharma",
        # "email": "rohit@example.com",
        "email": email,
        "job_title": "Backend Engineer",
        "country": "India",
        "salary": 120000,
        "currency": "INR",
        "employment_status": "ACTIVE",
        "date_of_joining": "2024-01-10",
    }

    create_response = client.post(
        "/employees",
        json=create_payload,
    )

    employee_id = create_response.json()["id"]

    update_payload = {
        # "salary": 150000
        "salary": 190000
    }

    response = client.patch(
        f"/employees/{employee_id}",
        json=update_payload,
    )

    assert response.status_code == 200

    response_data = response.json()

    # assert response_data["salary"] == 150000
    # assert response_data["salary"] == "190000"
    assert Decimal(response_data["salary"]) == Decimal("190000")


def test_update_nonexistent_employee_returns_404():
    response = client.patch(
        "/employees/999999",
        json={
            "salary": 500000
        },
    )

    assert response.status_code == 404


def test_update_employee_with_duplicate_email_returns_400():

    import uuid

    email_1 = f"alice{uuid.uuid4().hex[:6]}@example.com"
    email_2 = f"bob{uuid.uuid4().hex[:6]}@example.com"

    employee_one = {
        "full_name": "Alice",
        # "email": "alice@example.com",
        "email": email_1,
        "job_title": "Engineer",
        "country": "India",
        "salary": 100000,
        "currency": "INR",
        "employment_status": "ACTIVE",
        "date_of_joining": "2024-01-01",
    }

    employee_two = {
        "full_name": "Bob",
        # "email": "bob@example.com",
        "email": email_2,
        "job_title": "Engineer",
        "country": "India",
        "salary": 100000,
        "currency": "INR",
        "employment_status": "ACTIVE",
        "date_of_joining": "2024-01-01",
    }

    first_response = client.post(
        "/employees",
        json=employee_one,
    )

    second_response = client.post(
        "/employees",
        json=employee_two,
    )

    employee_id = second_response.json()["id"]

    response = client.patch(
        f"/employees/{employee_id}",
        json={
            # "email": "alice@example.com"
            "email": email_1
        },
    )

    assert response.status_code == 400
