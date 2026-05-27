import uuid

from fastapi.testclient import (
    TestClient,
)

from app.main import app


# Create test client instance
client = TestClient(app)


# Test employee creation with valid country-currency mapping
def test_create_employee_with_valid_currency():

    payload = {
        "full_name": "Valid User",
        "email": (
            f"{uuid.uuid4().hex[:6]}"
            "@example.com"
        ),
        "job_title": "Engineer",
        "country": "india",
        "salary": 50000,
        "currency": "INR",
        "employment_status": "FULL_TIME",
        "date_of_joining": "2024-01-01",
    }

    # Create employee record
    response = client.post(
        "/employees",
        json=payload,
    )

    assert response.status_code == 201

    data = response.json()

    # Validate normalized country and currency
    assert data["country"] == "india"

    assert data["currency"] == "INR"


# Test employee creation with invalid currency
def test_create_employee_with_invalid_currency():

    payload = {
        "full_name": "Invalid User",
        "email": (
            f"{uuid.uuid4().hex[:6]}"
            "@example.com"
        ),
        "job_title": "Engineer",
        "country": "india",
        "salary": 50000,
        "currency": "USD",
        "employment_status": "FULL_TIME",
        "date_of_joining": "2024-01-01",
    }

    # Attempt employee creation with invalid currency
    response = client.post(
        "/employees",
        json=payload,
    )

    assert response.status_code == 400

    # Validate currency mapping error message
    assert (
        response.json()["detail"]
        == "india must use INR"
    )


# Test employee creation with unsupported country
def test_create_employee_with_unknown_country():

    payload = {
        "full_name": (
            "Unknown Country User"
        ),
        "email": (
            f"{uuid.uuid4().hex[:6]}"
            "@example.com"
        ),
        "job_title": "Engineer",
        "country": "xyzland",
        "salary": 50000,
        "currency": "USD",
        "employment_status": "FULL_TIME",
        "date_of_joining": "2024-01-01",
    }

    # Create employee with unknown country
    response = client.post(
        "/employees",
        json=payload,
    )

    assert response.status_code == 201

    data = response.json()

    # Validate custom country support
    assert data["country"] == "xyzland"

    assert data["currency"] == "USD"


# Test employee update with invalid currency
def test_update_employee_with_invalid_currency():

    create_payload = {
        "full_name": "Update User",
        "email": (
            f"{uuid.uuid4().hex[:6]}"
            "@example.com"
        ),
        "job_title": "Engineer",
        "country": "india",
        "salary": 50000,
        "currency": "INR",
        "employment_status": "FULL_TIME",
        "date_of_joining": "2024-01-01",
    }

    # Create employee record
    create_response = client.post(
        "/employees",
        json=create_payload,
    )

    employee_id = (
        create_response.json()["id"]
    )

    update_payload = {
        "currency": "USD"
    }

    # Attempt invalid currency update
    response = client.patch(
        f"/employees/{employee_id}",
        json=update_payload,
    )

    assert response.status_code == 400

    # Validate currency validation error
    assert (
        response.json()["detail"]
        == "india must use INR"
    )


# Test employee update with valid currency configuration
def test_update_employee_with_valid_currency():

    create_payload = {
        "full_name": "Valid Update User",
        "email": (
            f"{uuid.uuid4().hex[:6]}"
            "@example.com"
        ),
        "job_title": "Engineer",
        "country": "india",
        "salary": 50000,
        "currency": "INR",
        "employment_status": "FULL_TIME",
        "date_of_joining": "2024-01-01",
    }

    # Create employee record
    create_response = client.post(
        "/employees",
        json=create_payload,
    )

    employee_id = (
        create_response.json()["id"]
    )

    update_payload = {
        "salary": 90000
    }

    # Update employee salary
    response = client.patch(
        f"/employees/{employee_id}",
        json=update_payload,
    )

    assert response.status_code == 200

    data = response.json()

    # Validate updated salary value
    assert data["salary"] == "90000.00"

    assert data["currency"] == "INR"


# Test employee update with unsupported country
def test_update_employee_with_unknown_country():

    create_payload = {
        "full_name": (
            "Unknown Country Update"
        ),
        "email": (
            f"{uuid.uuid4().hex[:6]}"
            "@example.com"
        ),
        "job_title": "Engineer",
        "country": "xyzland",
        "salary": 50000,
        "currency": "USD",
        "employment_status": "FULL_TIME",
        "date_of_joining": "2024-01-01",
    }

    # Create employee record
    create_response = client.post(
        "/employees",
        json=create_payload,
    )

    employee_id = (
        create_response.json()["id"]
    )

    update_payload = {
        "currency": "EUR"
    }

    # Update employee currency
    response = client.patch(
        f"/employees/{employee_id}",
        json=update_payload,
    )

    assert response.status_code == 200

    data = response.json()

    # Validate updated currency value
    assert data["currency"] == "EUR"
