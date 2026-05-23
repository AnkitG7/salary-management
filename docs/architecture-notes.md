# Architecture Notes

## Backend Stack

- Python 3.11
- FastAPI
- PostgreSQL
- SQLAlchemy ORM
- Pytest


## Why FastAPI

FastAPI was selected because it provides:

- strong request validation
- type-safe development
- automatic OpenAPI generation
- fast development iteration
- good testing ergonomics

The assignment focuses heavily on
backend quality and maintainability,
which aligns well with FastAPI's design.


## Why PostgreSQL

PostgreSQL was selected because:

- strong transactional guarantees
- mature indexing support
- reliable aggregation performance
- excellent SQL capabilities
- production-grade stability

The assignment includes salary analytics
queries which are well suited for
PostgreSQL aggregation capabilities.


## Why SQLAlchemy ORM

SQLAlchemy was used because:

- strong ORM abstractions
- explicit query construction
- good maintainability
- mature ecosystem
- production adoption

The project uses ORM queries for:
- CRUD operations
- filtering
- aggregation analytics


## Why TDD

The implementation followed a TDD-style
workflow where tests were added before
implementation changes whenever practical.

This improved:
- regression safety
- API correctness
- confidence during refactoring


## Backend Structure

The backend structure intentionally avoids
over-engineering and keeps the codebase small,
readable, and assignment-focused.

Main structure:

- api/
- core/
- models/
- schemas/
- utils/
- scripts/
- tests/


## Important Backend Features

Implemented backend features include:

- employee CRUD APIs
- pagination
- filtering
- salary analytics
- grouped aggregation queries
- metadata filter APIs
- normalization
- duplicate email handling
- performant employee seeding
