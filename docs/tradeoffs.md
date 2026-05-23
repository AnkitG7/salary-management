# Tradeoffs and Design Decisions

## Why Authentication Was Not Added

Authentication and authorization were
intentionally excluded because they were
outside the assignment scope.

Adding JWT/session-based authentication
would significantly increase complexity
without improving the core salary
management functionality being evaluated.


## Why Decimal/Numeric Was Used For Salary

Salary values were modeled using
NUMERIC/Decimal instead of floating
point types to avoid financial
precision issues.


## Why Alembic Was Not Added

The project intentionally avoided
Alembic migrations to keep the assignment
focused and lightweight.

For a production system, schema migrations
would absolutely be recommended.


## Why Batch Seeding Was Used

The assignment explicitly mentions that
engineers may run the seed script regularly
and performance matters.

To improve insertion performance:
- batch commits were used
- bulk_save_objects() was used
- transaction count was minimized


## Why Normalization Was Added

Fields such as:
- country
- job_title
- employment_status
- currency

are normalized before storage to prevent:
- inconsistent filtering
- duplicate categories
- broken aggregation analytics


## Why Composite Indexes Were Added

A composite index was added for:

(country, job_title)

because salary analytics frequently
filter on both fields together.


## Why Metadata APIs Were Added

The metadata filter-values API was added
to support frontend dropdown generation
without hardcoding values inside the UI.
