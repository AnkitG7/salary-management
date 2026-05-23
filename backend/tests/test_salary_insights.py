from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_salary_insights_by_country():
    employees = [
        {
            "full_name": "Employee One",
            "email": "salary-country-1@example.com",
            "job_title": "Engineer",
            "country": "India",
            "salary": 100000,
            "currency": "INR",
            "employment_status": "ACTIVE",
            "date_of_joining": "2024-01-01",
        },
        {
            "full_name": "Employee Two",
            "email": "salary-country-2@example.com",
            "job_title": "Engineer",
            "country": "India",
            "salary": 300000,
            "currency": "INR",
            "employment_status": "ACTIVE",
            "date_of_joining": "2024-01-01",
        },
    ]

    for employee in employees:
        client.post(
            "/employees",
            json=employee,
        )

    response = client.get(
        "/salary-insights?country=India"
    )

    assert response.status_code == 200

    response_data = response.json()

    assert response_data["country"] == "India"

    assert response_data["currency"] == "INR"

    assert response_data["minimum_salary"] == 100000

    assert response_data["maximum_salary"] == 300000

    assert response_data["average_salary"] == 200000
