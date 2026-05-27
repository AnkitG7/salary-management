# Engineering Tradeoffs

# Overview

This document outlines the key engineering decisions, tradeoffs, and constraints considered while building the Salary Management System.

The project was intentionally designed to balance:

- implementation speed
- maintainability
- scalability
- simplicity
- assessment scope
- developer experience
- deterministic testing
- production-oriented engineering practices

rather than over-engineering the solution prematurely.

The system was also developed using an AI-assisted workflow while maintaining strong focus on correctness, maintainability, and engineering clarity.

---

# Database Choice

## Chosen: PostgreSQL

The application uses PostgreSQL as the primary relational database managed through Docker Compose.

---

# Why PostgreSQL?

PostgreSQL was selected because it provides:

- strong relational consistency
- production-grade scalability
- reliable aggregation performance
- advanced indexing capabilities
- better concurrency handling
- strong transactional guarantees
- mature ecosystem and tooling

This aligned well with the assessment requirements involving:

- salary analytics
- filtering
- sorting
- pagination
- large employee datasets
- scalable query execution

---

# PostgreSQL Tradeoffs

## Advantages

- strong concurrency handling
- efficient aggregation queries
- advanced indexing support
- scalable filtering and sorting
- reliable transactional guarantees
- production-grade ecosystem
- better long-term scalability characteristics

---

## Limitations

PostgreSQL introduces additional operational complexity compared to SQLite:

- requires database server management
- Docker/container setup required
- more infrastructure overhead
- slightly slower onboarding compared to file-based databases

However, these tradeoffs were acceptable because the project intentionally aimed to demonstrate more production-oriented engineering practices.

---

# Dockerized Database Infrastructure

PostgreSQL is managed using Docker Compose.

---

# Why Docker Compose?

Docker Compose was selected because it provides:

- reproducible local environments
- isolated infrastructure setup
- simplified onboarding
- consistent development workflows
- easier dependency management

Example:

```bash
docker compose up -d
```

---

# Why FastAPI?

FastAPI was selected because it provides:

- strong developer experience
- automatic validation
- high performance
- clean request handling
- excellent API ergonomics
- automatic OpenAPI documentation

The framework allowed rapid iteration while maintaining good structure and validation guarantees.

---

# FastAPI Tradeoffs

## Advantages

- concise endpoint definitions
- strong typing support
- fast local iteration
- modern async-ready architecture
- automatic request validation

---

## Limitations

- smaller ecosystem compared to Django
- fewer built-in enterprise features
- requires more architectural decisions manually
- async complexity can increase operational debugging difficulty

For this project, the flexibility and speed of FastAPI outweighed these concerns.

---

# ORM Choice

## Chosen: SQLAlchemy

SQLAlchemy was used because:

- mature ecosystem
- strong query composition
- ORM + SQL flexibility
- scalable abstraction model
- excellent PostgreSQL compatibility

This was particularly useful for:

- filtering
- sorting
- pagination
- analytics queries
- aggregation workflows

---

# Frontend Framework Choice

## Chosen: React + Vite

---

# Why React?

React was selected because:

- large ecosystem
- reusable component model
- strong UI flexibility
- assessment compatibility
- scalable component architecture

---

# Why Vite?

Vite significantly improves:

- local startup speed
- rebuild performance
- frontend developer experience

compared to older bundlers.

---

# React Tradeoffs

## Advantages

- highly composable UI model
- reusable components
- strong ecosystem support
- excellent dashboard compatibility

---

## Limitations

- requires architectural discipline
- state management complexity can grow over time
- routing/data-fetching patterns are not opinionated

The project intentionally kept state management lightweight to avoid unnecessary abstraction.

---

# UI Library Choice

## Chosen: Ant Design

Ant Design was selected because:

- enterprise-oriented component library
- robust table system
- strong form support
- built-in accessibility considerations
- excellent theming capabilities

It significantly accelerated dashboard and CRUD interface development.

---

# Ant Design Tradeoffs

## Advantages

- rapid UI development
- strong component consistency
- built-in responsive behaviors
- token-based theming system
- enterprise-ready UX patterns

---

## Limitations

- relatively large bundle size
- opinionated design language
- customization complexity in some edge cases

Despite bundle-size tradeoffs, the productivity gains were considered worthwhile for the assessment.

---

# Charting Library Choice

## Chosen: Recharts

Recharts was chosen because:

- React-native API design
- composable chart architecture
- easy dashboard integration
- low implementation complexity

---

# Recharts Tradeoffs

## Advantages

- fast chart iteration
- simple APIs
- reusable chart components
- lightweight learning curve

---

## Limitations

- less flexible than lower-level visualization libraries
- limited advanced customization
- not ideal for extremely large datasets

For dashboard analytics in this assessment, Recharts provided sufficient flexibility with minimal implementation complexity.

---

# Server-Side Pagination

## Chosen Approach

Pagination is handled on the backend rather than in the frontend.

---

# Why?

The system was designed for:

- 10,000 employees
- scalable filtering
- scalable sorting
- deterministic pagination behavior

Loading all employees into browser memory would:

- increase payload size
- slow rendering
- increase memory usage
- reduce responsiveness

Server-side pagination prevents these issues.

---

# Tradeoffs

## Advantages

- reduced network payloads
- better browser performance
- scalable data access
- consistent sorting/filtering behavior

---

## Limitations

- more backend query complexity
- additional query parameter management
- more frontend API synchronization logic

The scalability benefits outweighed the added implementation complexity.

---

# Server-Side Filtering & Sorting

Filtering and sorting were intentionally implemented at the database layer.

---

# Why?

This avoids:

- client-side dataset duplication
- expensive frontend filtering
- inconsistent pagination behavior

The database is better suited for:

- ordering
- filtering
- aggregation

than the browser.

---

# Theme System Tradeoffs

## Chosen Approach

The frontend uses:

- Ant Design token theming
- dark/light algorithms
- centralized theme configuration

instead of hardcoded styles.

---

# Advantages

- scalable theme consistency
- maintainable styling
- easier dark mode support
- centralized visual behavior

---

# Limitations

- initial migration complexity
- more verbose style integration
- dependency on Ant Design token system

The maintainability benefits justified the additional implementation effort.

---

# Why No Global State Library?

The application intentionally avoids:

- Redux
- Zustand
- MobX

because the current state complexity did not justify additional abstraction.

React hooks were sufficient for:

- local component state
- query parameter management
- modal visibility
- theme state

This reduced:

- boilerplate
- cognitive overhead
- unnecessary architectural complexity

---

# Why No Alembic?

The project intentionally does not use Alembic migrations.

---

# Reasoning

The assessment scope:

- involved relatively stable schema evolution
- prioritized rapid iteration
- focused on application functionality and architecture

Adding migration infrastructure would introduce:

- additional operational complexity
- migration maintenance overhead
- extra repository noise

without substantial benefit for the current assessment scope.

---

# Tradeoffs

## Advantages

- simpler developer workflow
- reduced infrastructure complexity
- faster iteration

---

## Limitations

- weaker schema versioning
- reduced migration traceability
- less suitable for large production teams

For production environments, migration tooling would likely be introduced.

---

# Testing Tradeoffs

## Chosen Strategy

The project follows a Test-Driven Development (TDD) oriented workflow.

The testing strategy prioritizes:

- deterministic tests
- isolated tests
- API-level integration testing
- maintainable test structure
- lightweight frontend tests

---

# Why?

The goal was to maximize:

- confidence
- readability
- maintainability
- debugging clarity
- refactoring safety

rather than maximizing test quantity alone.

---

# Limitations

The project currently does not include:

- E2E testing
- browser automation testing
- load testing
- performance benchmarking

These would likely be added in larger production systems.

---

# Deployment Tradeoffs

The project currently prioritizes:

- simplicity
- portability
- local development speed

over:

- distributed infrastructure
- container orchestration
- cloud-native deployment complexity

This was intentional given the assessment scope.

---

# AI-Assisted Development Tradeoffs

AI tooling significantly accelerated:

- UI iteration
- debugging workflows
- architecture exploration
- repetitive code generation
- refactoring workflows

However, all generated outputs required:

- manual verification
- testing
- architectural validation
- refactoring
- correctness review

The project intentionally prioritized engineering judgment over blindly accepting generated code.

---

# Future Production Improvements

Potential future enhancements include:

- Alembic migrations
- Redis caching
- async database support
- Dockerized full-stack deployment
- Kubernetes deployment
- CI/CD pipelines
- authentication & authorization
- observability tooling
- rate limiting
- virtualized frontend tables
- background analytics processing

---

# Final Notes

The architecture intentionally prioritizes:

- clarity
- maintainability
- deterministic behavior
- scalable query patterns
- engineering readability
- modularity
- production-oriented design

while avoiding premature optimization and unnecessary infrastructure complexity.

The implementation decisions reflect practical engineering tradeoffs appropriate for the scope and constraints of the assessment while still demonstrating scalable engineering practices.
