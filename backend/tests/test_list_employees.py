from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_list_employees_returns_200():
    response = client.get("/employees")

    assert response.status_code == 200

    response_data = response.json()

    assert isinstance(response_data, list)
