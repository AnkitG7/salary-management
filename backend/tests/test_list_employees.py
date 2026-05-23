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
