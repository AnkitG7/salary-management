from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_list_employees_returns_200():
    response = client.get("/employees")

    assert response.status_code == 200

    response_data = response.json()

    assert isinstance(response_data, list)

def test_list_employees_supports_limit():
    response = client.get(
        "/employees?limit=1"
    )

    assert response.status_code == 200

    response_data = response.json()

    assert len(response_data) <= 1

def test_list_employees_supports_country_filter():
    response = client.get(
        "/employees?country=India"
    )

    assert response.status_code == 200

    response_data = response.json()

    assert len(response_data) > 0

    for employee in response_data:
        assert employee["country"] == "India"



def test_list_employees_supports_limit_and_offset():
    import uuid

    email_1 = f"Employee_1{uuid.uuid4().hex[:6]}@example.com"
    email_2 = f"Employee_2{uuid.uuid4().hex[:6]}@example.com"
    employees_to_create = [
        {
            "full_name": "Employee One",
            # "email": "employee-one@example.com",
            "email": email_1,
            "job_title": "Engineer",
            "country": "India",
            "salary": 100000,
            "currency": "INR",
            "employment_status": "ACTIVE",
            "date_of_joining": "2024-01-01",
        },
        {
            "full_name": "Employee Two",
            # "email": "employee-two@example.com",
            "email": email_2,
            "job_title": "Engineer",
            "country": "India",
            "salary": 120000,
            "currency": "INR",
            "employment_status": "ACTIVE",
            "date_of_joining": "2024-01-01",
        },
    ]

    for employee in employees_to_create:
        client.post(
            "/employees",
            json=employee,
        )

    all_response = client.get(
        "/employees"
    )

    all_employees = all_response.json()

    assert len(all_employees) >= 2

    first_page_response = client.get(
        "/employees?limit=1&offset=0"
    )

    second_page_response = client.get(
        "/employees?limit=1&offset=1"
    )

    first_page_data = first_page_response.json()

    second_page_data = second_page_response.json()

    assert len(first_page_data) == 1
    assert len(second_page_data) == 1

    assert (
        first_page_data[0]["id"]
        != second_page_data[0]["id"]
    )
