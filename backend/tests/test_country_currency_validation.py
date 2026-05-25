import uuid

from fastapi.testclient import (
    TestClient,
)

from app.main import app

client = TestClient(app)


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

    response = client.post(
        "/employees",
        json=payload,
    )

    assert response.status_code == 201

    data = response.json()

    assert data["country"] == "india"

    assert data["currency"] == "INR"


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

    response = client.post(
        "/employees",
        json=payload,
    )

    assert response.status_code == 400

    assert (
        response.json()["detail"]
        == "india must use INR"
    )


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

    response = client.post(
        "/employees",
        json=payload,
    )

    assert response.status_code == 201

    data = response.json()

    assert data["country"] == "xyzland"

    assert data["currency"] == "USD"


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

    response = client.patch(
        f"/employees/{employee_id}",
        json=update_payload,
    )

    assert response.status_code == 400

    assert (
        response.json()["detail"]
        == "india must use INR"
    )


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

    response = client.patch(
        f"/employees/{employee_id}",
        json=update_payload,
    )

    assert response.status_code == 200

    data = response.json()

    # assert data["salary"] == 90000
    assert data["salary"] == "90000.00"

    assert data["currency"] == "INR"


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

    response = client.patch(
        f"/employees/{employee_id}",
        json=update_payload,
    )

    assert response.status_code == 200

    data = response.json()

    assert data["currency"] == "EUR"
