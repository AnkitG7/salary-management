from decimal import Decimal
import uuid

from fastapi.testclient import TestClient

from app.main import app


# Create test client instance
client = TestClient(app)


# Test successful employee salary update
def test_update_employee_salary():

    # Generate unique email for test isolation
    email = f"rohit{uuid.uuid4().hex[:6]}@example.com"

    create_payload = {
        "full_name": "Rohit Sharma",
        "email": email,
        "job_title": "Backend Engineer",
        "country": "India",
        "salary": 120000,
        "currency": "INR",
        "employment_status": "FULL_TIME",
        "date_of_joining": "2024-01-10",
    }

    # Create employee record
    create_response = client.post(
        "/employees",
        json=create_payload,
    )

    employee_id = create_response.json()["id"]

    # Update employee salary
    update_payload = {
        "salary": 190000
    }

    response = client.patch(
        f"/employees/{employee_id}",
        json=update_payload,
    )

    assert response.status_code == 200

    response_data = response.json()

    # Validate updated salary value
    assert Decimal(response_data["salary"]) == Decimal("190000")


# Test updating non-existing employee
def test_update_nonexistent_employee_returns_404():

    response = client.patch(
        "/employees/999999",
        json={
            "salary": 500000
        },
    )

    assert response.status_code == 404


# Test duplicate email validation during update
def test_update_employee_with_duplicate_email_returns_400():

    # Generate unique emails for both employees
    email_1 = f"alice{uuid.uuid4().hex[:6]}@example.com"
    email_2 = f"bob{uuid.uuid4().hex[:6]}@example.com"

    employee_one = {
        "full_name": "Alice",
        "email": email_1,
        "job_title": "Engineer",
        "country": "India",
        "salary": 100000,
        "currency": "INR",
        "employment_status": "FULL_TIME",
        "date_of_joining": "2024-01-01",
    }

    employee_two = {
        "full_name": "Bob",
        "email": email_2,
        "job_title": "Engineer",
        "country": "India",
        "salary": 100000,
        "currency": "INR",
        "employment_status": "FULL_TIME",
        "date_of_joining": "2024-01-01",
    }

    # Create first employee
    first_response = client.post(
        "/employees",
        json=employee_one,
    )

    # Create second employee
    second_response = client.post(
        "/employees",
        json=employee_two,
    )

    employee_id = second_response.json()["id"]

    # Attempt updating with duplicate email
    response = client.patch(
        f"/employees/{employee_id}",
        json={
            "email": email_1
        },
    )

    assert response.status_code == 400
