from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_list_employees_returns_200():
    response = client.get(
        "/employees"
    )

    assert response.status_code == 200

    response_data = response.json()

    assert "items" in response_data
    assert "total" in response_data

    assert isinstance(
        response_data["items"],
        list,
    )

    assert isinstance(
        response_data["total"],
        int,
    )


def test_list_employees_supports_limit():
    response = client.get(
        "/employees?limit=1"
    )

    assert response.status_code == 200

    response_data = response.json()

    employees = response_data["items"]

    assert len(employees) <= 1


def test_list_employees_supports_country_filter():
    response = client.get(
        "/employees?country=India"
    )

    assert response.status_code == 200

    response_data = response.json()

    employees = response_data["items"]

    assert len(employees) > 0

    for employee in employees:
        assert (
            employee["country"]
            == "india"
        )


def test_list_employees_supports_limit_and_offset():
    import uuid

    email_1 = (
        f"employee_1_"
        f"{uuid.uuid4().hex[:6]}"
        "@example.com"
    )

    email_2 = (
        f"employee_2_"
        f"{uuid.uuid4().hex[:6]}"
        "@example.com"
    )

    employees_to_create = [
        {
            "full_name":
                "Employee One",

            "email": email_1,

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
        },
        {
            "full_name":
                "Employee Two",

            "email": email_2,

            "job_title":
                "Engineer",

            "country":
                "India",

            "salary":
                120000,

            "currency":
                "INR",

            "employment_status":
                "FULL_TIME",

            "date_of_joining":
                "2024-01-01",
        },
    ]

    for employee in employees_to_create:
        client.post(
            "/employees",
            json=employee,
        )

    all_response = client.get(
        "/employees"
    )

    all_response_data = (
        all_response.json()
    )

    all_employees = (
        all_response_data["items"]
    )

    assert len(all_employees) >= 2

    first_page_response = client.get(
        "/employees?limit=1&offset=0"
    )

    second_page_response = client.get(
        "/employees?limit=1&offset=1"
    )

    first_page_data = (
        first_page_response
        .json()["items"]
    )

    second_page_data = (
        second_page_response
        .json()["items"]
    )

    assert len(first_page_data) == 1

    assert len(second_page_data) == 1

    assert (
        first_page_data[0]["id"]
        != second_page_data[0]["id"]
    )


def test_list_employees_returns_total_count():
    response = client.get(
        "/employees"
    )

    assert response.status_code == 200

    response_data = response.json()

    assert (
        response_data["total"]
        >= len(
            response_data["items"]
        )
    )


def test_list_employees_supports_sorting():
    response = client.get(
        "/employees?sort_by=full_name&order=asc"
    )

    assert response.status_code == 200

    response_data = response.json()

    items = response_data["items"]

    names = [
        employee["full_name"]
        for employee in items
    ]

    assert names == sorted(names)

def test_invalid_sort_field_returns_400():
    response = client.get(
        "/employees?sort_by=salary"
    )

    assert response.status_code == 400

    response_data = response.json()

    assert (
        response_data["detail"]
        == "Invalid sort field"
    )


def test_invalid_sort_order_returns_400():
    response = client.get(
        "/employees?order=random"
    )

    assert response.status_code == 400

    response_data = response.json()

    assert (
        response_data["detail"]
        == "Invalid sort order"
    )

def test_limit_is_capped_at_max_page_size():
    response = client.get(
        "/employees?limit=1000"
    )

    assert response.status_code == 200

    response_data = response.json()

    assert (
        len(
            response_data["items"]
        )
        <= 50
    )
##########################################

def test_list_employees_supports_search_by_name():
    response = client.get(
        "/employees?search=aarav"
    )

    assert response.status_code == 200

    response_data = response.json()

    items = response_data["items"]

    assert len(items) > 0

    for employee in items:
        assert (
            "aarav"
            in employee[
                "full_name"
            ].lower()
        )

def test_list_employees_supports_search_by_email():
    response = client.get(
        "/employees?search=@example.com"
    )

    assert response.status_code == 200

    response_data = response.json()

    items = response_data["items"]

    assert len(items) > 0

def test_search_is_case_insensitive():
    response = client.get(
        "/employees?search=AARAV"
    )

    assert response.status_code == 200

    response_data = response.json()

    items = response_data["items"]

    assert len(items) > 0


def test_empty_search_returns_all_results():
    response = client.get(
        "/employees?search="
    )

    assert response.status_code == 200

    response_data = response.json()

    assert "items" in response_data


def test_list_employees_supports_job_title_filter():
    response = client.get(
        "/employees?job_title=backend engineer"
    )

    assert response.status_code == 200

    response_data = response.json()

    items = response_data["items"]

    assert len(items) > 0

    for employee in items:
        assert (
            employee["job_title"]
            == "backend engineer"
        )

def test_list_employees_supports_employment_status_filter():
    response = client.get(
        "/employees?employment_status=FULL_TIME"
    )

    assert response.status_code == 200

    response_data = response.json()

    items = response_data["items"]

    assert len(items) > 0

    for employee in items:
        assert (
            employee[
                "employment_status"
            ]
            == "FULL_TIME"
        )


def test_list_employees_supports_currency_filter():
    response = client.get(
        "/employees?currency=INR"
    )

    assert response.status_code == 200

    response_data = response.json()

    items = response_data["items"]

    assert len(items) > 0

    for employee in items:
        assert (
            employee["currency"]
            == "INR"
        )


def test_country_filter_is_case_insensitive():
    response = client.get(
        "/employees?country=INDIA"
    )

    assert response.status_code == 200

    response_data = response.json()

    items = response_data["items"]

    assert len(items) > 0

    for employee in items:
        assert (
            employee["country"]
            == "india"
        )
