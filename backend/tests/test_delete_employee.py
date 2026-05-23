from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_delete_employee_returns_204():
    create_payload = {
        "full_name": "Delete Test",
        "email": "delete@example.com",
        "job_title": "Engineer",
        "country": "India",
        "salary": 100000,
        "currency": "INR",
        "employment_status": "ACTIVE",
        "date_of_joining": "2024-01-01",
    }

    create_response = client.post(
        "/employees",
        json=create_payload,
    )

    employee_id = create_response.json()["id"]

    response = client.delete(
        f"/employees/{employee_id}"
    )

    assert response.status_code == 204
