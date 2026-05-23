import uuid

from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_salary_insights_by_country():
    email_1 = (
        f"salary1-{uuid.uuid4().hex[:6]}"
        "@example.com"
    )

    email_2 = (
        f"salary2-{uuid.uuid4().hex[:6]}"
        "@example.com"
    )

    country = (
        f"country-{uuid.uuid4().hex[:4]}"
    )

    employees = [
        {
            "full_name": "Employee One",
            "email": email_1,
            "job_title": "Engineer",
            "country": country,
            "salary": 100000,
            "currency": "INR",
            "employment_status": "ACTIVE",
            "date_of_joining": "2024-01-01",
        },
        {
            "full_name": "Employee Two",
            "email": email_2,
            "job_title": "Engineer",
            "country": country,
            "salary": 300000,
            "currency": "INR",
            "employment_status": "ACTIVE",
            "date_of_joining": "2024-01-01",
        },
    ]

    for employee in employees:
        create_response = client.post(
            "/employees",
            json=employee,
        )

        assert create_response.status_code == 201

    response = client.get(
        "/salary-insights",
        params={"country": country},
    )

    assert response.status_code == 200

    response_data = response.json()

    assert response_data["country"] == country

    assert response_data["currency"] == "INR"

    assert response_data["minimum_salary"] == 100000

    assert response_data["maximum_salary"] == 300000

    assert response_data["average_salary"] == 200000
