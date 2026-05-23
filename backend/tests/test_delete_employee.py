from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_delete_employee_returns_204():
    create_payload = {
        "full_name": "Delete Test",
        "email": "delete-test-1@example.com",
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


def test_deleted_employee_is_no_longer_returned():
    create_payload = {
        "full_name": "Delete Verify",
        "email": "deleteverify@example.com",
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

    delete_response = client.delete(
        f"/employees/{employee_id}"
    )

    assert delete_response.status_code == 204

    list_response = client.get(
        "/employees"
    )

    employees = list_response.json()

    employee_ids = [
        employee["id"]
        for employee in employees
    ]

    assert employee_id not in employee_ids


def test_delete_nonexistent_employee_returns_404():
    response = client.delete(
        "/employees/999999"
    )

    assert response.status_code == 404
