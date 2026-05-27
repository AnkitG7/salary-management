# Salary Management System

Production-style full-stack salary management platform built for managing employee records, salary analytics, and workforce insights at scale.

Designed using modern frontend and backend technologies with a focus on:

- scalable architecture
- maintainability
- deterministic testing
- production-oriented engineering
- large dataset handling
- AI-assisted development workflows

The system is optimized for organizations with 10,000+ employees.

---

# Assessment Context

This project was built as part of an engineering assessment focused on:

- product thinking
- engineering fundamentals
- scalable architecture
- production-quality code
- deterministic testing
- AI-assisted software development workflows

The assessment emphasized:

- clarity in thought and structured problem solving
- maintainable and scalable engineering decisions
- intentional AI usage with correctness validation
- production-oriented implementation quality
- incremental software evolution through commits
- end-to-end functional system design

---

# Development Approach

The project was developed using an AI-assisted engineering workflow while maintaining strong engineering standards.

Key development principles followed:

- Test-Driven Development (TDD)
- incremental implementation
- deterministic testing
- modular architecture
- production-style code organization
- maintainable abstractions
- scalable query design
- intentional AI-assisted iteration

AI tooling was used to:

- accelerate implementation
- validate architecture decisions
- improve UI iteration speed
- assist debugging workflows
- refactor repetitive logic
- improve development efficiency

All generated outputs were manually:

- reviewed
- validated
- tested
- refactored
- integrated intentionally

---

# Product Overview

The platform enables HR teams and administrators to:

- Manage employee records
- Analyze salary distributions
- Explore workforce insights
- Monitor compensation metrics
- Search and filter employees efficiently
- Visualize workforce analytics interactively

The application is designed to remain maintainable, responsive, and performant even with large employee datasets.

---

# Features

# Employee Management

- Create employee
- View employee details
- Update employee information
- Delete employee
- Search employees
- Filter employees
- Paginated employee listing
- Sorted employee querying

Employee data includes:

- full name
- email
- country
- salary
- currency
- employment status
- job title
- date of joining

---

# Salary Insights

- Average salary by country
- Minimum salary by country
- Maximum salary by country
- Average salary by job title
- Salary analytics by country and role

---

# Workforce Analytics

- Employee distribution by country
- Employee distribution by employment status
- Employee distribution by job title

Additional analytics were added to improve HR visibility and workforce understanding.

---

# UI Features

- Responsive dashboard
- Dark mode / light mode
- Persistent theme settings
- Interactive charts
- Loading states
- Empty states
- Reusable modal workflows
- Modern enterprise UI design

---

# Application Screenshots

## Dashboard

![Dashboard](./screenshots/dashboard.png)

---

## Dashboard Dark Mode

![Dashboard Dark Mode](./screenshots/dashboard_darkmode.png)

---

## Analytics

![Analytics](./screenshots/analytics.png)

---

## Employees

![Employees](./screenshots/employees.png)

---

## Employee Details

![Employee Details](./screenshots/employees_details.png)


# Demo Video

Watch the application demo here:

[Project Demo Video](https://your-video-link)

# System Architecture

```text
┌──────────────────────────────────────┐
│              Frontend                │
│      React + Vite + Ant Design       │
└────────────────┬─────────────────────┘
                 │ HTTP / REST APIs
                 ▼
┌──────────────────────────────────────┐
│              Backend                 │
│      FastAPI + SQLAlchemy ORM        │
└────────────────┬─────────────────────┘
                 │ Database Queries
                 ▼
┌──────────────────────────────────────┐
│             PostgreSQL               │
│        Docker Compose Managed        │
└──────────────────────────────────────┘
```

---

# Repository Structure

```text
salary-management-system/
├── backend/
├── frontend/
├── docs/
├── docker-compose.yml
└── README.md
```

---

# Backend Architecture

```text
backend/app/
├── api/
├── constants/
├── core/
├── models/
├── schemas/
└── utils/
```

---

# Backend Highlights

- FastAPI REST APIs
- SQLAlchemy ORM
- PostgreSQL database
- Pydantic validation
- Server-side pagination
- Server-side filtering
- Server-side sorting
- Input normalization
- Validation utilities
- Modular architecture
- Deterministic testing

---

# Frontend Architecture

```text
frontend/src/
├── api/
├── components/
│   ├── analytics/
│   ├── dashboard/
│   └── employees/
├── layouts/
├── pages/
├── tests/
└── utils/
```

---

# Frontend Highlights

- React + Vite architecture
- Ant Design UI system
- Token-based theming
- Recharts analytics visualizations
- Modular dashboard widgets
- Centralized API layer
- Responsive layouts
- Reusable components

---

# Technology Stack

# Frontend

- React
- Vite
- Ant Design
- Recharts
- Axios
- React Router DOM

---

# Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- Pytest

---

# Infrastructure & Tooling

- Docker Compose
- Uvicorn
- Local environment configuration
- Modular project structure

---

# Scalability Considerations

The platform was intentionally designed around the 10,000 employee requirement.

---

# Backend Scalability

Implemented:

- Server-side pagination
- Database-side filtering
- Database-side sorting
- Query composition
- Indexed query patterns
- Efficient aggregation queries
- Bulk seeding support
- Batched database operations

Avoided:

- Loading full datasets into memory
- Client-side filtering for large datasets
- Excessive API payload sizes
- Unbounded query responses

---

# Frontend Scalability

Implemented:

- Paginated tables
- Controlled API fetching
- Reusable chart components
- Isolated component rendering
- Minimal duplicated state
- Modular rendering strategy

This prevents excessive browser memory consumption with large employee datasets.

---

# Database Design Considerations

PostgreSQL was selected because it provides:

- Strong relational consistency
- Better production scalability
- Reliable aggregation performance
- Advanced indexing capabilities
- Better concurrency handling
- Production-ready ecosystem

The backend architecture is designed to support:

- scalable filtering queries
- salary aggregation analytics
- future migration tooling
- large workforce datasets

---

# Database Optimizations

Indexed fields include:

- email
- full_name
- country
- job_title
- employment_status
- currency
- date_of_joining

Composite index:

```python
(country, job_title)
```

Improves:

- salary analytics queries
- filtering performance
- aggregation efficiency

---

# Seeder Design

The project includes optimized seeding scripts for generating 10,000 employees.

Employee names are generated using combinations from:

- `first_names.txt`
- `last_names.txt`

Seeder optimizations include:

- batch inserts
- controlled transaction sizes
- bulk database operations
- realistic workforce distributions

This allows engineers to rerun seeding scripts efficiently during development.

---

# Docker Support

PostgreSQL is managed using Docker Compose.

Start database services:

```bash
docker compose up -d
```

Benefits:

- consistent local development
- isolated database environment
- easier onboarding
- simplified dependency management

---

# Theme System

The frontend uses Ant Design token-based theming for:

- Dark mode
- Light mode
- Typography
- Borders
- Backgrounds
- Shadows
- Consistent design scaling

Theme preferences persist using:

```text
localStorage
```

---

# Testing Strategy

The project follows a Test-Driven Development (TDD) oriented workflow.

The testing strategy focuses on:

- deterministic tests
- fast execution
- isolated behavior validation
- production-critical workflows
- maintainable test structure

---

# Backend Testing

Backend tests cover:

- Employee CRUD
- Filtering
- Sorting
- Searching
- Salary analytics
- Validation behavior
- Metadata endpoints
- Error handling

Current status:

```text
43 passing tests
```

---

# Frontend Testing

Frontend tests cover:

- Rendering behavior
- Employee list functionality
- Component interaction
- UI integration

Testing stack:

- Vitest
- React Testing Library

---

# Running the Project

# 1. Clone Repository

```bash
git clone <repository-url>
cd salary-management-system
```

---

# 2. Start PostgreSQL Using Docker

```bash
docker compose up -d
```

---

# Backend Setup

## Navigate to Backend

```bash
cd backend
```

---

## Create Virtual Environment

### Windows

```bash
python -m venv .venv
.venv\Scripts\activate
```

### Linux / macOS

```bash
python -m venv .venv
source .venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Configure Environment Variables

Create:

```text
backend/.env
```

Example:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/salary_management
```

---

## Start Backend Server

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

---

# Frontend Setup

## Navigate to Frontend

```bash
cd frontend
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create:

```text
frontend/.env
```

Example:

```env
VITE_API_BASE_URL=http://localhost:8000
```

---

## Start Frontend Development Server

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# Running Tests

# Backend Tests

```bash
cd backend
pytest
```

---

# Frontend Tests

```bash
cd frontend
npm run test
```

---

# Production Build

# Frontend Build

```bash
npm run build
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

# Engineering Decisions

# Why FastAPI?

- Excellent developer experience
- Strong validation support
- Automatic OpenAPI documentation
- Async-ready architecture
- High performance request handling

---

# Why PostgreSQL?

- Production-grade relational database
- Better concurrency handling
- Strong indexing support
- Efficient aggregation queries
- Better scalability than SQLite
- Reliable transactional guarantees

---

# Why React + Vite?

- Fast local development
- Minimal tooling complexity
- Efficient production builds
- Strong ecosystem support

---

# Why Ant Design?

- Enterprise-oriented UI components
- Accessibility support
- Robust theming capabilities
- Dashboard-friendly design system

---

# Why SQLAlchemy?

- ORM abstraction
- Query composability
- Migration-friendly structure
- Strong database portability

---

# Artifacts & Engineering Notes

The repository may include additional engineering artifacts such as:

- architecture notes
- planning documents
- AI prompt references
- tradeoff explanations
- scalability considerations
- testing strategy notes

These artifacts help explain implementation decisions and development reasoning.

---

# AI-Assisted Development

AI tooling was intentionally used to:

- Accelerate UI iteration
- Improve architecture validation
- Assist debugging workflows
- Refactor repetitive logic
- Improve testing workflows
- Explore implementation alternatives

All generated outputs were manually:

- Reviewed
- Validated
- Refactored
- Tested
- Integrated intentionally

Final engineering decisions, architecture choices, and implementation details were manually verified throughout development.

---

# Future Improvements

Potential next steps include:

- Alembic migrations
- Redis caching
- Async database support
- Virtualized tables
- Debounced searching
- Role-based authentication
- Export functionality
- Advanced analytics
- Dockerized full-stack deployment
- Kubernetes deployment
- CI/CD pipelines
- OpenTelemetry observability
- E2E testing
- Background job processing

---

# Assessment Alignment

This implementation addresses requirements for:

- Employee management
- Salary analytics
- Workforce insights
- Scalable architecture
- Deterministic testing
- Maintainable code structure
- Frontend/backend integration
- Production-style engineering practices
- AI-assisted development workflow

---

# Author

Developed as part of the Salary Management Assessment.
