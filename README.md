# Salary Management System

Backend implementation for the Incubyte Salary Management Assessment.

The system allows HR managers to:

- manage employees
- analyze salary insights
- filter employee data
- view aggregation metrics
- seed large employee datasets efficiently


# Tech Stack

- Python 3.11
- FastAPI
- PostgreSQL
- SQLAlchemy
- Pytest


# Features

## Employee Management

- Create employees
- List employees
- Update employees
- Delete employees

Employee fields include:

- full_name
- email
- job_title
- country
- salary
- currency
- employment_status
- date_of_joining


## Salary Insights

- minimum salary by country
- maximum salary by country
- average salary by country
- average salary by job title
- employee count by country
- employee count by job title
- employment status distribution


## Backend Engineering Features

- pagination
- filtering
- normalization
- Decimal salary modeling
- composite indexing
- duplicate email handling
- performant bulk seeding
- TDD-oriented development


# Project Structure

```text
backend/
├── app/
│   ├── api/
│   ├── core/
│   ├── models/
│   ├── schemas/
│   ├── utils/
│   └── main.py
├── data/
├── docs/
├── scripts/
├── tests/
└── README.md
```


# Setup Instructions

## 1. Create Virtual Environment

```bash
python -m venv .venv
```

## 2. Activate Virtual Environment

### Windows

```bash
.venv\Scripts\activate
```

### Linux/macOS

```bash
source .venv/bin/activate
```

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```


# Environment Variables

Create:

```text
.env
```

Example:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/salary_management
```


# Run Backend

```bash
uvicorn app.main:app --reload
```


# Run Tests

```bash
pytest
```


# Seed 10,000 Employees

```bash
python -m scripts.seed_employees
```


# API Overview

## Employee APIs

| Method | Endpoint |
|---|---|
| POST | /employees |
| GET | /employees |
| PATCH | /employees/{id} |
| DELETE | /employees/{id} |


## Salary Insight APIs

| Method | Endpoint |
|---|---|
| GET | /salary-insights |
| GET | /salary-insights/job-title-average |
| GET | /salary-insights/employee-count-by-country |
| GET | /salary-insights/employee-count-by-job-title |
| GET | /salary-insights/employment-status-distribution |
| GET | /salary-insights/filter-values |


# Design Notes

Additional engineering notes are available in:

- docs/architecture-notes.md
- docs/tradeoffs.md
- docs/ai-usage-notes.md
- docs/seeding-notes.md


# Important Backend Decisions

- Salary uses Decimal/Numeric for financial precision
- Employee fields are normalized before persistence
- Composite indexes optimize analytics queries
- Seeder uses batch insertion for performance
- Authentication intentionally excluded from assignment scope


# Testing

The backend uses pytest-based automated tests covering:

- CRUD operations
- pagination
- filtering
- salary analytics
- validation
- normalization
- duplicate handling


# Future Improvements

Possible future enhancements:

- authentication/authorization
- frontend dashboard
- Dockerization
- Alembic migrations
- caching
- role-based access control
- advanced analytics
