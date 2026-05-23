from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_create_employee_returns_201():
    import uuid

    email = f"ankit{uuid.uuid4().hex[:6]}@example.com"
    payload = {
        "full_name": "Ankit Sharma",
        # "email": "ankit8@example.com",
        "email": email,
        "job_title": "Software Engineer",
        "country": "India",
        "salary": 50000,
        "currency": "INR",
        "employment_status": "ACTIVE",
        "date_of_joining": "2024-01-15",
    }

    response = client.post(
        "/employees",
        json=payload,
    )

    assert response.status_code == 201

    response_data = response.json()

    assert response_data["full_name"] == "Ankit Sharma"
    # assert response_data["email"] == "ankit8@example.com"
    assert response_data["email"] == email
    assert response_data["job_title"] == "software engineer"
    assert response_data["country"] == "india"
    assert response_data["salary"] == 50000
    assert response_data["currency"] == "INR"
    assert response_data["employment_status"] == "ACTIVE"


def test_create_employee_rejects_duplicate_email():
    payload = {
        "full_name": "Duplicate User",
        "email": "duplicate@example.com",
        "job_title": "Software Engineer",
        "country": "India",
        "salary": 50000,
        "currency": "INR",
        "employment_status": "ACTIVE",
        "date_of_joining": "2024-01-15",
    }

    first_response = client.post(
        "/employees",
        json=payload,
    )

    assert first_response.status_code == 201

    second_response = client.post(
        "/employees",
        json=payload,
    )

    assert second_response.status_code == 409

    response_data = second_response.json()

    assert (
        response_data["detail"]
        == "Employee email already exists"
    )
