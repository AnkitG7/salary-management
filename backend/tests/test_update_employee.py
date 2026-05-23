from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_update_employee_salary():
    create_payload = {
        "full_name": "Rohit Sharma",
        "email": "rohit@example.com",
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
        "salary": 150000
    }

    response = client.patch(
        f"/employees/{employee_id}",
        json=update_payload,
    )

    assert response.status_code == 200

    response_data = response.json()

    assert response_data["salary"] == 150000
