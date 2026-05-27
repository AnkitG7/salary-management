from fastapi.testclient import TestClient

from app.main import app


# Create test client instance
client = TestClient(app)


# Test metadata endpoint for country-currency mapping
def test_get_country_currency_mapping():

    response = client.get(
        "/metadata/countries"
    )

    assert response.status_code == 200

    data = response.json()

    # Validate response type
    assert isinstance(data, list)

    # Ensure response contains data
    assert len(data) > 0

    # Validate expected fields in response
    assert "country" in data[0]

    assert "currency" in data[0]
