# Salary Management System Backend

Production-style backend service for employee salary management, HR analytics, and workforce insights built using FastAPI and PostgreSQL.

Designed with scalable API architecture, strong validation, optimized querying, and production-oriented engineering practices.

---

# Overview

This project provides:

- Employee management APIs
- Salary analytics APIs
- Advanced filtering and pagination
- Data normalization and validation
- Country-currency enforcement
- Optimized PostgreSQL querying
- Bulk data seeding support
- Production-ready backend structure

Built as part of the Incubyte Salary Management Assessment.

---

# Features

## Employee Management

- Create employee
- Get employee by ID
- Update employee
- Delete employee
- List employees

---

## Advanced Employee Listing

Supports:

- Pagination
- Filtering
- Searching
- Sorting
- Stable ordering

Filters available for:

- Country
- Job title
- Employment status
- Currency

---

## Salary Analytics

Provides insights such as:

- Minimum salary by country
- Maximum salary by country
- Average salary by country
- Average salary by job title
- Employee count by country
- Employee count by job title
- Employment status distribution

---

## Validation & Data Quality

Includes:

- Country-currency validation
- Email uniqueness validation
- Request schema validation using Pydantic
- Input normalization
- Data consistency enforcement

---

## Performance Optimizations

- Indexed database columns
- Composite indexes
- Pagination limits
- Efficient filtering queries
- Bulk insert seeding
- Batched database operations

---

# Tech Stack

## Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic

---

## Testing

- Pytest

---

## Tooling

- Docker Compose
- Uvicorn

---

# Project Structure

```bash
backend/
│
├── app/
│   │   main.py
│   │
│   ├── api/
│   │   ├── employees.py
│   │   ├── metadata.py
│   │   └── salary_insights.py
│   │
│   ├── constants/
│   │   └── country_currency.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   ├── constants.py
│   │   └── database.py
│   │
│   ├── models/
│   │   └── employee.py
│   │
│   ├── schemas/
│   │   ├── employee.py
│   │   ├── pagination.py
│   │   └── salary_insights.py
│   │
│   └── utils/
│       ├── normalization.py
│       └── validators.py
│
├── data/
│   ├── first_names.txt
│   └── last_names.txt
│
├── scripts/
│   ├── seed_equivalent.py
│   └── seed_random.py
│
├── tests/
│   ├── test_create_employee.py
│   ├── test_update_employee.py
│   ├── test_delete_employee.py
│   ├── test_get_employee.py
│   ├── test_list_employees.py
│   ├── test_salary_insights.py
│   ├── test_country_currency_validation.py
│   ├── test_metadata.py
│   └── test_health.py
│
├── docker-compose.yml
├── requirements.txt
├── pyproject.toml
└── README.md
```

---

# API Endpoints

# Employee APIs

## Create Employee

```http
POST /employees
```

---

## List Employees

```http
GET /employees
```

### Supported Query Parameters

| Parameter | Description |
|---|---|
| limit | Pagination limit |
| offset | Pagination offset |
| country | Filter by country |
| job_title | Filter by job title |
| employment_status | Filter by employment status |
| currency | Filter by currency |
| search | Search by employee fields |
| sort_by | Sorting field |
| order | asc / desc |

### Example

```http
GET /employees?country=india&sort_by=full_name&order=asc
```

---

## Get Employee By ID

```http
GET /employees/{employee_id}
```

---

## Update Employee

```http
PATCH /employees/{employee_id}
```

---

## Delete Employee

```http
DELETE /employees/{employee_id}
```

---

# Salary Insight APIs

## Salary Statistics By Country

```http
GET /salary-insights?country=india
```

### Returns

- Minimum salary
- Maximum salary
- Average salary

---

## Average Salary By Job Title

```http
GET /salary-insights/job-title?country=india&job_title=backend engineer
```

---

## Employee Count By Country

```http
GET /salary-insights/employee-count-by-country
```

---

## Employee Count By Job Title

```http
GET /salary-insights/employee-count-by-job-title
```

---

## Employment Status Distribution

```http
GET /salary-insights/employment-status-distribution
```

---

# Metadata APIs

## Country Currency Mapping

```http
GET /metadata/countries
```

---

# Local Development Setup

# 1. Clone Repository

```bash
git clone <repository-url>
cd backend
```

---

# 2. Create Virtual Environment

## Windows

```bash
python -m venv .venv
.venv\Scripts\activate
```

## Linux / macOS

```bash
python -m venv .venv
source .venv/bin/activate
```

---

# 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

# 4. Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/salary_management
```

---

# 5. Start PostgreSQL

Using Docker Compose:

```bash
docker compose up -d
```

---

# 6. Start Backend Server

```bash
uvicorn app.main:app --reload
```

Application runs at:

```text
http://localhost:8000
```

---

# API Documentation

## Swagger UI

```text
http://localhost:8000/docs
```

---

## ReDoc

```text
http://localhost:8000/redoc
```

---

# Running Tests

## Run All Tests

```bash
pytest
```

---

## Run Tests With Verbose Output

```bash
pytest -v
```

---

# Database Design

# Employee Table

| Field | Description |
|---|---|
| id | Primary key |
| full_name | Employee full name |
| email | Unique employee email |
| job_title | Employee role |
| country | Employee country |
| salary | Salary amount |
| currency | Salary currency |
| employment_status | Employment type/status |
| date_of_joining | Joining date |
| created_at | Record creation timestamp |
| updated_at | Record update timestamp |

---

# Database Optimizations

## Indexed Columns

Indexes added for:

- email
- full_name
- country
- job_title
- employment_status
- currency
- date_of_joining

---

## Composite Index

```python
(country, job_title)
```

### Improves

- Salary analytics queries
- Filtering performance
- Aggregation efficiency

---

# Seeder Scripts

Two seeding strategies are provided.

---

## Random Seeder

```bash
python scripts/seed_random.py
```

### Generates

- Random names
- Random salaries
- Random employment data

---

## Equivalent Seeder

```bash
python scripts/seed_equivalent.py
```

### Uses

- Weighted distributions
- Realistic employee distributions
- Realistic country/job ratios

---

# Seeder Performance

Optimizations used:

- Batch inserts
- bulk_save_objects
- Controlled transaction sizes

### Batch Size

```python
BATCH_SIZE = 1000
```

### Total Employees

```python
TOTAL_EMPLOYEES = 10000
```

---

# Input Normalization

Automatic normalization applied for:

- country
- job_title
- email
- currency
- employment_status

### Examples

```text
india -> india
INR -> INR
Backend Engineer -> backend engineer
```

---

# Country Currency Validation

Supported mappings:

```text
india -> INR
united states -> USD
canada -> CAD
germany -> EUR
japan -> JPY
```

Invalid combinations return:

```http
400 Bad Request
```

### Example

```text
india must use INR
```

---

# Architecture Notes

## Design Goals

- Simple architecture
- Maintainable codebase
- Strong validation
- Production-oriented API design
- Testable structure
- Scalable query patterns

---

## Why FastAPI?

- Automatic OpenAPI documentation
- Strong Pydantic integration
- Fast request validation
- Excellent developer experience
- Async-ready architecture

---

## Why SQLAlchemy?

- ORM abstraction
- Query composability
- PostgreSQL compatibility
- Migration-ready structure
- Flexible relationship modeling

---

# Testing Strategy

Tests cover:

- CRUD operations
- Salary analytics
- Filtering
- Pagination
- Searching
- Sorting
- Validation
- Error handling

### Characteristics

- Deterministic
- Isolated
- Fast
- Production-oriented

---

# Health Check

```http
GET /health
```

### Response

```json
{
  "status": "healthy"
}
```

---

# Future Improvements

Potential production enhancements:

- JWT authentication
- Alembic migrations
- Redis caching
- Async database support
- Background job processing
- Audit logging
- Rate limiting
- OpenTelemetry tracing
- Kubernetes deployment
- CI/CD pipelines
- Centralized logging
- Metrics and observability

---

# Author

Built for the Incubyte Salary Management Assessment.
