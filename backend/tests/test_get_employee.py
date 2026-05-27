from fastapi.testclient import (
    TestClient,
)

from app.main import app


# Create test client instance
client = TestClient(app)


# Test fetching employee by ID
def test_get_employee_by_id():

    import uuid

    # Generate unique email for test isolation
    email = (
        f"get-employee-"
        f"{uuid.uuid4().hex[:6]}"
        "@example.com"
    )

    create_payload = {
        "full_name":
            "Get Employee",

        "email": email,

        "job_title":
            "Engineer",

        "country":
            "India",

        "salary":
            100000,

        "currency":
            "INR",

        "employment_status":
            "FULL_TIME",

        "date_of_joining":
            "2024-01-01",
    }

    # Create employee record
    create_response = client.post(
        "/employees",
        json=create_payload,
    )

    employee_id = (
        create_response.json()["id"]
    )

    # Fetch employee by ID
    response = client.get(
        f"/employees/{employee_id}"
    )

    assert response.status_code == 200

    response_data = response.json()

    # Validate returned employee ID
    assert (
        response_data["id"]
        == employee_id
    )


# Test fetching non-existing employee
def test_get_nonexistent_employee_returns_404():

    response = client.get(
        "/employees/999999"
    )

    assert response.status_code == 404
