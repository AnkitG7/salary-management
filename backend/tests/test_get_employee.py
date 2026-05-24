from fastapi.testclient import (
    TestClient,
)

from app.main import app


client = TestClient(app)


def test_get_employee_by_id():
    import uuid

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

    create_response = client.post(
        "/employees",
        json=create_payload,
    )

    employee_id = (
        create_response.json()["id"]
    )

    response = client.get(
        f"/employees/{employee_id}"
    )

    assert response.status_code == 200

    response_data = response.json()

    assert (
        response_data["id"]
        == employee_id
    )


def test_get_nonexistent_employee_returns_404():
    response = client.get(
        "/employees/999999"
    )

    assert response.status_code == 404
