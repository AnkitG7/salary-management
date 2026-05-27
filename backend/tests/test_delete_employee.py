import uuid

from fastapi.testclient import TestClient

from app.main import app


# Create test client instance
client = TestClient(app)


# Test successful employee deletion
def test_delete_employee_returns_204():

    # Generate unique email for test isolation
    email = (
        f"delete-test-{uuid.uuid4().hex[:6]}"
        "@example.com"
    )

    create_payload = {
        "full_name": "Delete Test",
        "email": email,
        "job_title": "Engineer",
        "country": "India",
        "salary": 100000,
        "currency": "INR",
        "employment_status": "FULL_TIME",
        "date_of_joining": "2024-01-01",
    }

    # Create employee record
    create_response = client.post(
        "/employees",
        json=create_payload,
    )

    assert create_response.status_code == 201

    employee_id = (
        create_response.json()["id"]
    )

    # Delete employee record
    response = client.delete(
        f"/employees/{employee_id}"
    )

    assert response.status_code == 204


# Test deleted employee is inaccessible
def test_deleted_employee_is_no_longer_returned():

    # Generate unique email for test isolation
    email = (
        f"delete-verify-{uuid.uuid4().hex[:6]}"
        "@example.com"
    )

    create_payload = {
        "full_name": "Delete Verify",
        "email": email,
        "job_title": "Engineer",
        "country": "India",
        "salary": 100000,
        "currency": "INR",
        "employment_status": "FULL_TIME",
        "date_of_joining": "2024-01-01",
    }

    # Create employee record
    create_response = client.post(
        "/employees",
        json=create_payload,
    )

    assert create_response.status_code == 201

    employee_id = (
        create_response.json()["id"]
    )

    # Delete employee record
    delete_response = client.delete(
        f"/employees/{employee_id}"
    )

    assert delete_response.status_code == 204

    # Verify deleted employee cannot be fetched
    get_response = client.get(
        f"/employees/{employee_id}"
    )

    assert (
        get_response.status_code
        == 404
    )


# Test deleting non-existing employee
def test_delete_nonexistent_employee_returns_404():

    response = client.delete(
        "/employees/999999"
    )

    assert response.status_code == 404
