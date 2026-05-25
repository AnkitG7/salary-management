from fastapi.testclient import (
    TestClient,
)

from app.main import app

client = TestClient(app)


def test_get_country_currency_mapping():
    response = client.get(
        "/metadata/countries"
    )

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)

    assert len(data) > 0

    assert "country" in data[0]

    assert "currency" in data[0]
