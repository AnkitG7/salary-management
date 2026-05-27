# Architecture Notes

# Overview

The Salary Management System is a production-style full-stack web application designed for managing and analyzing workforce compensation data for organizations with 10,000+ employees.

The system was designed around the following goals:

- maintainable architecture
- scalable query patterns
- modular frontend structure
- deterministic testing
- rapid local development
- clean separation of concerns
- production-oriented engineering practices
- Test-Driven Development (TDD)

The project was intentionally developed using an AI-assisted engineering workflow while maintaining strong focus on correctness, maintainability, and scalability.

---

# High-Level System Architecture

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

# Frontend Architecture

## Frontend Stack

- React
- Vite
- Ant Design
- Recharts
- Axios

---

# Frontend Structure

```text
frontend/src
├── api
├── components
├── layouts
├── pages
├── tests
└── utils
```

---

# Frontend Design Decisions

## Page-Based Composition

Pages are responsible for:

- data orchestration
- layout composition
- page-level state

Reusable components are responsible for:

- rendering
- interaction
- visualization
- isolated UI behavior

This separation reduces component complexity and improves maintainability.

---

## API Layer Isolation

All backend communication is centralized inside:

```text
src/api
```

Benefits:

- reusable API logic
- easier refactoring
- reduced duplication
- simpler testing
- cleaner UI components

---

## Token-Based Theming

The frontend uses Ant Design theme tokens instead of hardcoded styling values.

This enables:

- dark mode support
- light mode support
- consistent visual scaling
- centralized theme management

Examples:

- token.colorBgContainer
- token.colorText
- token.colorBorderSecondary
- token.boxShadowSecondary

This significantly reduced theme inconsistency issues during development.

---

## Analytics Component Decomposition

Analytics functionality was intentionally split into:

- country analytics
- job title analytics
- workforce analytics

instead of a single large dashboard component.

Benefits:

- modular rendering
- easier maintenance
- reusable chart logic
- clearer ownership boundaries

---

# Backend Architecture

## Backend Stack

- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- Pytest

---

# Backend Structure

```text
backend/app
├── api
├── constants
├── core
├── models
├── schemas
├── utils
└── main.py
```

---

# Backend Design Decisions

## API Layer

The API layer handles:

- request validation
- query parameter parsing
- response serialization
- endpoint orchestration

Business logic is intentionally separated from routing concerns where possible.

---

## Schema Separation

Pydantic schemas were separated from database models to:

- isolate validation logic
- improve API safety
- prevent ORM leakage
- maintain explicit contracts

This improves long-term maintainability and API clarity.

---

## Utility Layer

Utility modules were introduced for:

- formatting
- normalization
- validation
- reusable query helpers

This reduced duplication across endpoints and improved consistency.

---

# Database Design

## Database Choice

PostgreSQL was selected because it provides:

- production-grade relational consistency
- better scalability characteristics
- stronger concurrency handling
- advanced indexing support
- efficient aggregation queries
- reliable transactional guarantees

The database layer was intentionally designed to support:

- salary aggregation analytics
- scalable filtering queries
- large workforce datasets
- future migration tooling
- efficient pagination behavior

---

# Database Optimizations

Indexed columns include:

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

Benefits:

- faster salary analytics
- improved filtering performance
- better aggregation efficiency

---

# Dockerized Infrastructure

PostgreSQL is managed using Docker Compose.

Benefits:

- isolated local database environment
- reproducible development setup
- easier onboarding
- simplified dependency management
- consistent local development workflows

Example:

```bash
docker compose up -d
```

---

# Request Lifecycle

## Example: Employee Search Flow

```text
User enters search query
        |
        v
React state update
        |
        v
API request via Axios
        |
        v
FastAPI endpoint receives request
        |
        v
SQLAlchemy query composition
        |
        v
PostgreSQL executes filtered query
        |
        v
Serialized JSON response
        |
        v
Frontend table re-render
```

---

# Pagination Strategy

The system intentionally uses server-side pagination.

Reasoning:

- avoids loading all 10,000 employees into browser memory
- reduces API payload size
- improves frontend responsiveness
- improves scalability characteristics

Query parameters:

- limit
- offset

are handled at the database query layer.

---

# Filtering & Sorting Strategy

Filtering and sorting are performed at the database layer rather than in the frontend.

Benefits:

- reduced frontend memory usage
- lower network payloads
- improved scalability
- deterministic pagination behavior

Supported query behaviors include:

- search
- country filtering
- job title filtering
- employment status filtering
- sorting
- pagination

---

# Salary Analytics Design

Analytics queries were intentionally separated from employee CRUD endpoints.

Benefits:

- cleaner API boundaries
- easier optimization
- simpler frontend integration
- independent analytics evolution

Implemented analytics include:

- average salary
- minimum salary
- maximum salary
- average salary by job title
- workforce composition metrics

Additional analytics were added beyond the minimum assessment requirements to improve HR visibility and product usability.

---

# Seeding Strategy

The application includes optimized seeding workflows capable of generating 10,000 employee records efficiently.

Employee names are generated using combinations from:

- first_names.txt
- last_names.txt

The seeding workflow was designed to:

- support repeated execution
- minimize insert overhead
- improve seeding performance
- generate realistic workforce distributions

Optimizations include:

- batch inserts
- controlled transaction sizes
- bulk database operations

---

# Testing Architecture

## Test-Driven Development (TDD)

The project followed a TDD-oriented development workflow.

Core functionality was typically implemented alongside tests to ensure:

- deterministic behavior
- stable API contracts
- safer refactoring
- long-term maintainability

The testing strategy focuses on:

- correctness
- readability
- isolation
- repeatability
- fast execution

---

# Backend Testing

Backend tests focus on:

- API correctness
- validation behavior
- filtering logic
- sorting behavior
- analytics correctness
- CRUD operations

Tests were designed to remain:

- deterministic
- isolated
- readable
- repeatable

Special attention was given to avoiding:

- shared database state pollution
- ordering instability
- flaky assertions

---

# Frontend Testing

Frontend tests focus on:

- rendering behavior
- component interaction
- employee list rendering
- integration behavior

Testing stack:

- Vitest
- React Testing Library

---

# Performance Considerations

The system was designed around the assumption of 10,000 employees.

Key decisions:

- server-side pagination
- database-side filtering
- lightweight query composition
- reusable frontend rendering
- minimized client-side state duplication

This prevents:

- large browser memory consumption
- expensive client-side filtering
- oversized API responses

---

# Theme Architecture

Dark mode and light mode are implemented using:

- Ant Design algorithms
- token-based styling
- persistent theme storage

Theme state is persisted using:

```text
localStorage
```

This enables:

- consistent UX
- automatic theme restoration
- centralized visual behavior

---

# AI-Assisted Engineering Workflow

AI tools were intentionally used to:

- accelerate implementation
- improve UI iteration speed
- validate architectural decisions
- assist debugging workflows
- improve testing workflows
- refactor repetitive logic

All generated outputs were manually:

- reviewed
- validated
- tested
- refactored
- integrated intentionally

The final architecture, implementation details, and engineering decisions were manually verified throughout development.

---

# Future Improvements

Potential future improvements include:

- Alembic migrations
- Redis caching
- async database support
- Dockerized full-stack deployment
- Kubernetes deployment
- CI/CD pipelines
- role-based authentication
- virtualized tables
- debounced searching
- E2E testing
- observability tooling
- OpenTelemetry tracing

---

# Final Notes

The architecture intentionally prioritizes:

- maintainability
- readability
- modularity
- deterministic behavior
- rapid iteration
- engineering clarity
- scalable query patterns

over premature optimization or unnecessary infrastructure complexity.

The resulting system is lightweight, understandable, production-oriented, and aligned with the scope of the assessment while still demonstrating scalable engineering practices.
