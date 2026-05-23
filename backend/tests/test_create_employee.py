from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_create_employee_returns_201():
    payload = {
        "full_name": "Ankit Sharma",
        "email": "ankit11@example.com",
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
    assert response_data["email"] == "ankit11@example.com"
    assert response_data["job_title"] == "Software Engineer"
    assert response_data["country"] == "India"
    assert response_data["salary"] == 50000
    assert response_data["currency"] == "INR"
    assert response_data["employment_status"] == "ACTIVE"
