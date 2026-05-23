import uuid

from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_salary_insights_by_country():
    email_1 = (
        f"salary1-{uuid.uuid4().hex[:6]}"
        "@example.com"
    )

    email_2 = (
        f"salary2-{uuid.uuid4().hex[:6]}"
        "@example.com"
    )

    country = (
        f"country-{uuid.uuid4().hex[:4]}"
    )

    employees = [
        {
            "full_name": "Employee One",
            "email": email_1,
            "job_title": "Engineer",
            "country": country,
            "salary": 100000,
            "currency": "INR",
            "employment_status": "ACTIVE",
            "date_of_joining": "2024-01-01",
        },
        {
            "full_name": "Employee Two",
            "email": email_2,
            "job_title": "Engineer",
            "country": country,
            "salary": 300000,
            "currency": "INR",
            "employment_status": "ACTIVE",
            "date_of_joining": "2024-01-01",
        },
    ]

    for employee in employees:
        create_response = client.post(
            "/employees",
            json=employee,
        )

        assert create_response.status_code == 201

    response = client.get(
        "/salary-insights",
        params={"country": country},
    )

    assert response.status_code == 200

    response_data = response.json()

    assert response_data["country"] == country

    assert response_data["currency"] == "INR"

    assert response_data["minimum_salary"] == 100000

    assert response_data["maximum_salary"] == 300000

    assert response_data["average_salary"] == 200000


def test_average_salary_by_job_title():

    email_1 = (
        f"sal-jb1-{uuid.uuid4().hex[:6]}"
        "@example.com"
    )

    email_2 = (
        f"sal-jb2-{uuid.uuid4().hex[:6]}"
        "@example.com"
    )

    country = (
        f"cty-jb-{uuid.uuid4().hex[:4]}"
    )

    employees = [
        {
            "full_name": "Backend One",
            # "email": "backend-job-1@example.com",
            "email": email_1,
            "job_title": "Backend Engineer",
            # "country": "India",
            "country": country,
            "salary": 100000,
            "currency": "INR",
            "employment_status": "ACTIVE",
            "date_of_joining": "2024-01-01",
        },
        {
            "full_name": "Backend Two",
            # "email": "backend-job-2@example.com",
            "email": email_2,
            "job_title": "Backend Engineer",
            # "country": "India",
            "country": country,
            "salary": 300000,
            "currency": "INR",
            "employment_status": "ACTIVE",
            "date_of_joining": "2024-01-01",
        },
    ]

    for employee in employees:
        client.post(
            "/employees",
            json=employee,
        )

    # response = client.get(
    #     "/salary-insights/job-title"
    #     "?country=India"
    #     "&job_title=Backend Engineer"
    # )

    response = client.get(
    "/salary-insights/job-title",
    params={
        # "country": "India",
        "country": country,
        "job_title": "Backend Engineer",
    },
)

    assert response.status_code == 200

    response_data = response.json()

    # assert response_data["country"] == "India"
    assert response_data["country"] == country

    assert (
        response_data["job_title"]
        == "Backend Engineer"
    )

    assert response_data["currency"] == "INR"

    assert response_data["average_salary"] == 200000




def test_employee_count_by_country():
    import uuid

    country_1 = (
        f"country-a-{uuid.uuid4().hex[:4]}"
    )

    country_2 = (
        f"country-b-{uuid.uuid4().hex[:4]}"
    )

    employees = [
        {
            "full_name": "Employee One",
            "email": (
                f"country-count-1-"
                f"{uuid.uuid4().hex[:6]}"
                "@example.com"
            ),
            "job_title": "Engineer",
            "country": country_1,
            "salary": 100000,
            "currency": "INR",
            "employment_status": "ACTIVE",
            "date_of_joining": "2024-01-01",
        },
        {
            "full_name": "Employee Two",
            "email": (
                f"country-count-2-"
                f"{uuid.uuid4().hex[:6]}"
                "@example.com"
            ),
            "job_title": "Engineer",
            "country": country_1,
            "salary": 200000,
            "currency": "INR",
            "employment_status": "ACTIVE",
            "date_of_joining": "2024-01-01",
        },
        {
            "full_name": "Employee Three",
            "email": (
                f"country-count-3-"
                f"{uuid.uuid4().hex[:6]}"
                "@example.com"
            ),
            "job_title": "Engineer",
            "country": country_2,
            "salary": 300000,
            "currency": "USD",
            "employment_status": "ACTIVE",
            "date_of_joining": "2024-01-01",
        },
    ]

    for employee in employees:
        create_response = client.post(
            "/employees",
            json=employee,
        )

        assert create_response.status_code == 201

    response = client.get(
        "/salary-insights/employee-count-by-country"
    )

    assert response.status_code == 200

    response_data = response.json()

    assert response_data[country_1] >= 2

    assert response_data[country_2] >= 1

def test_employee_count_by_job_title():
    import uuid

    job_title = (
        f"Backend-{uuid.uuid4().hex[:4]}"
    )

    employees = [
        {
            "full_name": "Employee One",
            "email": (
                f"job-title-1-"
                f"{uuid.uuid4().hex[:6]}"
                "@example.com"
            ),
            "job_title": job_title,
            "country": "India",
            "salary": 100000,
            "currency": "INR",
            "employment_status": "ACTIVE",
            "date_of_joining": "2024-01-01",
        },
        {
            "full_name": "Employee Two",
            "email": (
                f"job-title-2-"
                f"{uuid.uuid4().hex[:6]}"
                "@example.com"
            ),
            "job_title": job_title,
            "country": "India",
            "salary": 200000,
            "currency": "INR",
            "employment_status": "ACTIVE",
            "date_of_joining": "2024-01-01",
        },
    ]

    for employee in employees:
        create_response = client.post(
            "/employees",
            json=employee,
        )

        assert create_response.status_code == 201

    response = client.get(
        "/salary-insights/employee-count-by-job-title"
    )

    assert response.status_code == 200

    response_data = response.json()

    assert response_data[job_title] >= 2

def test_employment_status_distribution():
    import uuid

    employees = [
        {
            "full_name": "Employee One",
            "email": (
                f"status-1-"
                f"{uuid.uuid4().hex[:6]}"
                "@example.com"
            ),
            "job_title": "Engineer",
            "country": "India",
            "salary": 100000,
            "currency": "INR",
            "employment_status": "FULL_TIME",
            "date_of_joining": "2024-01-01",
        },
        {
            "full_name": "Employee Two",
            "email": (
                f"status-2-"
                f"{uuid.uuid4().hex[:6]}"
                "@example.com"
            ),
            "job_title": "Engineer",
            "country": "India",
            "salary": 200000,
            "currency": "INR",
            "employment_status": "CONTRACT",
            "date_of_joining": "2024-01-01",
        },
    ]

    for employee in employees:
        create_response = client.post(
            "/employees",
            json=employee,
        )

        assert create_response.status_code == 201

    response = client.get(
        "/salary-insights/employment-status-distribution"
    )

    assert response.status_code == 200

    response_data = response.json()

    assert response_data["FULL_TIME"] >= 1

    assert response_data["CONTRACT"] >= 1


def test_filter_values_returns_unique_countries():
    response = client.get(
        "/salary-insights/filter-values"
        "?field=country"
    )

    assert response.status_code == 200

    response_data = response.json()

    assert isinstance(response_data, list)

    assert len(response_data) > 0

    assert all(
        isinstance(value, str)
        for value in response_data
    )

def test_filter_values_rejects_invalid_field():
    response = client.get(
        "/salary-insights/filter-values"
        "?field=salary"
    )

    assert response.status_code == 400

def test_salary_insights_are_case_insensitive():
    import uuid

    email = (
        f"case-test-{uuid.uuid4().hex[:6]}"
        "@example.com"
    )

    client.post(
        "/employees",
        json={
            "full_name": "Case Test",
            "email": email,
            "job_title": "Backend Engineer",
            "country": "India",
            "salary": 100000,
            "currency": "inr",
            "employment_status": "active",
            "date_of_joining": "2024-01-01",
        },
    )

    response = client.get(
        "/salary-insights?country=INDIA"
    )

    assert response.status_code == 200
