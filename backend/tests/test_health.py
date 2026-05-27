from fastapi.testclient import TestClient

from app.main import app


# Create test client instance
client = TestClient(app)


# Test health endpoint response
def test_health_endpoint_returns_healthy_status():

    response = client.get("/health")

    assert response.status_code == 200

    # Validate health check response
    assert response.json() == {
        "status": "healthy"
    }
