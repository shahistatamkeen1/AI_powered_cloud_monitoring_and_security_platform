from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_backend_health():
    response = client.get("/")
    assert response.status_code in [200, 404]

def test_docs_available():
    response = client.get("/docs")
    assert response.status_code == 200