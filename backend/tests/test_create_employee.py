from decimal import Decimal
import uuid

from fastapi.testclient import TestClient

from app.main import app


# Create test client instance
client = TestClient(app)


# Test successful employee creation
def test_create_employee_returns_201():

    # Generate unique email for test isolation
    email = f"ankit{uuid.uuid4().hex[:6]}@example.com"

    payload = {
        "full_name": "Ankit Sharma",
        "email": email,
        "job_title": "Software Engineer",
        "country": "India",
        "salary": 50000,
        "currency": "INR",
        "employment_status": "FULL_TIME",
        "date_of_joining": "2024-01-15",
    }

    # Create employee record
    response = client.post(
        "/employees",
        json=payload,
    )

    assert response.status_code == 201

    response_data = response.json()

    # Validate created employee data
    assert response_data["full_name"] == "Ankit Sharma"

    assert response_data["email"] == email

    assert response_data["job_title"] == "software engineer"

    assert response_data["country"] == "india"

    assert Decimal(response_data["salary"]) == Decimal("50000")

    assert response_data["currency"] == "INR"

    assert response_data["employment_status"] == "FULL_TIME"


# Test duplicate email validation
def test_create_employee_rejects_duplicate_email():

    # Generate unique email for test isolation
    email = (
        f"duplicate-{uuid.uuid4().hex[:6]}"
        "@example.com"
    )

    payload = {
        "full_name": "Duplicate UserForEmail",
        "email": email,
        "job_title": "Software Engineer",
        "country": "India",
        "salary": 50000,
        "currency": "INR",
        "employment_status": "FULL_TIME",
        "date_of_joining": "2024-01-15",
    }

    # Create first employee
    first_response = client.post(
        "/employees",
        json=payload,
    )

    assert first_response.status_code == 201

    # Attempt creating employee with same email
    second_response = client.post(
        "/employees",
        json=payload,
    )

    assert second_response.status_code == 409

    response_data = second_response.json()

    # Validate duplicate email error response
    assert (
        response_data["detail"]
        == "Employee email already exists"
    )
