import uuid

from fastapi.testclient import TestClient

from app.main import app


# Create test client instance
client = TestClient(app)


# Test employee listing endpoint
def test_list_employees_returns_200():

    response = client.get(
        "/employees"
    )

    assert response.status_code == 200

    response_data = response.json()

    # Validate pagination response structure
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


# Test employee listing with limit parameter
def test_list_employees_supports_limit():

    response = client.get(
        "/employees?limit=1"
    )

    assert response.status_code == 200

    response_data = response.json()

    employees = response_data["items"]

    # Ensure limit is respected
    assert len(employees) <= 1


# Test employee filtering by country
def test_list_employees_supports_country_filter():

    response = client.get(
        "/employees?country=India"
    )

    assert response.status_code == 200

    response_data = response.json()

    employees = response_data["items"]

    assert len(employees) > 0

    # Validate country filter results
    for employee in employees:
        assert (
            employee["country"]
            == "india"
        )


# Test pagination using limit and offset
def test_list_employees_supports_limit_and_offset():

    # Generate unique emails for test isolation
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

    # Create test employees
    for employee in employees_to_create:
        client.post(
            "/employees",
            json=employee,
        )

    # Fetch all employees
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

    # Fetch first page
    first_page_response = client.get(
        "/employees?limit=1&offset=0"
    )

    # Fetch second page
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

    # Validate pagination results
    assert len(first_page_data) == 1

    assert len(second_page_data) == 1

    assert (
        first_page_data[0]["id"]
        != second_page_data[0]["id"]
    )


# Test total employee count response
def test_list_employees_returns_total_count():

    response = client.get(
        "/employees"
    )

    assert response.status_code == 200

    response_data = response.json()

    # Ensure total count is valid
    assert (
        response_data["total"]
        >= len(
            response_data["items"]
        )
    )


# Test employee sorting functionality
def test_list_employees_supports_sorting():

    # Generate unique identifier for test isolation
    unique_id = uuid.uuid4().hex[:6]

    employees = [
        {
            "full_name": f"Charlie {unique_id}",
            "email": f"charlie_{unique_id}@example.com",
            "job_title": "Engineer",
            "country": "India",
            "salary": 100000,
            "currency": "INR",
            "employment_status": "FULL_TIME",
            "date_of_joining": "2024-01-01",
        },
        {
            "full_name": f"Alice {unique_id}",
            "email": f"alice_{unique_id}@example.com",
            "job_title": "Engineer",
            "country": "India",
            "salary": 100000,
            "currency": "INR",
            "employment_status": "FULL_TIME",
            "date_of_joining": "2024-01-01",
        },
        {
            "full_name": f"Bob {unique_id}",
            "email": f"bob_{unique_id}@example.com",
            "job_title": "Engineer",
            "country": "India",
            "salary": 100000,
            "currency": "INR",
            "employment_status": "FULL_TIME",
            "date_of_joining": "2024-01-01",
        },
    ]

    # Create test employees
    for employee in employees:
        client.post(
            "/employees",
            json=employee,
        )

    # Fetch sorted employee list
    response = client.get(
        f"/employees?search={unique_id}&sort_by=full_name&order=asc"
    )

    assert response.status_code == 200

    response_data = response.json()

    items = response_data["items"]

    names = [
        employee["full_name"]
        for employee in items
    ]

    # Validate ascending sort order
    assert names == sorted(
        names,
        key=str.lower,
    )


# Test invalid sort field validation
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


# Test invalid sort order validation
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


# Test maximum page size enforcement
def test_limit_is_capped_at_max_page_size():

    response = client.get(
        "/employees?limit=1000"
    )

    assert response.status_code == 200

    response_data = response.json()

    # Ensure API enforces max limit
    assert (
        len(
            response_data["items"]
        )
        <= 50
    )


# Test employee search by full name
def test_list_employees_supports_search_by_name():

    email_and_name = f"aaRav{uuid.uuid4().hex[:6]}@example.com"

    full_name = email_and_name[:5]

    payload = {
        "full_name": full_name,
        "email": email_and_name,
        "job_title": "Software Engineer",
        "country": "India",
        "salary": 50000,
        "currency": "INR",
        "employment_status": "FULL_TIME",
        "date_of_joining": "2024-01-15",
    }

    # Create employee record
    response = client.post(
        "/employees",
        json=payload,
    )

    # Search employee by name
    response = client.get(
        f"/employees?search={full_name.capitalize()}"
    )

    assert response.status_code == 200

    response_data = response.json()

    items = response_data["items"]

    assert len(items) > 0

    # Validate search results
    for employee in items:
        assert (
            full_name.lower()
            in employee[
                "full_name"
            ].lower()
        )


# Test employee search by email
def test_list_employees_supports_search_by_email():

    response = client.get(
        "/employees?search=@example.com"
    )

    assert response.status_code == 200

    response_data = response.json()

    items = response_data["items"]

    assert len(items) > 0


# Test case-insensitive search functionality
def test_search_is_case_insensitive():

    response = client.get(
        "/employees?search=ExamPLe"
    )

    assert response.status_code == 200

    response_data = response.json()

    items = response_data["items"]

    assert len(items) > 0


# Test empty search query handling
def test_empty_search_returns_all_results():

    response = client.get(
        "/employees?search="
    )

    assert response.status_code == 200

    response_data = response.json()

    assert "items" in response_data


# Test filtering employees by job title
def test_list_employees_supports_job_title_filter():

    response = client.get(
        "/employees?job_title=software engineer"
    )

    assert response.status_code == 200

    response_data = response.json()

    items = response_data["items"]

    assert len(items) > 0

    # Validate job title filter results
    for employee in items:
        assert (
            employee["job_title"]
            == "software engineer"
        )


# Test filtering employees by employment status
def test_list_employees_supports_employment_status_filter():

    response = client.get(
        "/employees?employment_status=FULL_TIME"
    )

    assert response.status_code == 200

    response_data = response.json()

    items = response_data["items"]

    assert len(items) > 0

    # Validate employment status filter
    for employee in items:
        assert (
            employee[
                "employment_status"
            ]
            == "FULL_TIME"
        )


# Test filtering employees by currency
def test_list_employees_supports_currency_filter():

    response = client.get(
        "/employees?currency=INR"
    )

    assert response.status_code == 200

    response_data = response.json()

    items = response_data["items"]

    assert len(items) > 0

    # Validate currency filter results
    for employee in items:
        assert (
            employee["currency"]
            == "INR"
        )


# Test case-insensitive country filtering
def test_country_filter_is_case_insensitive():

    response = client.get(
        "/employees?country=INDIA"
    )

    assert response.status_code == 200

    response_data = response.json()

    items = response_data["items"]

    assert len(items) > 0

    # Validate normalized country values
    for employee in items:
        assert (
            employee["country"]
            == "india"
        )
