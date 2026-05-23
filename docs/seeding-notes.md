# Employee Seeder Design Notes

## Why batch insertion was used

Inserting 10,000 employees one-by-one with
individual commits would create excessive
transaction overhead and significantly slow
down database writes.

The implementation uses:

- SQLAlchemy bulk_save_objects()
- batch size of 1000
- transaction commit per batch

This reduces:

- ORM tracking overhead
- transaction overhead
- database roundtrips

while maintaining readability and simplicity.


## Why UUID email suffixes were added

The assignment mentions that engineers may
run the seeding script regularly.

To make repeated seeding runs safe,
emails include a UUID suffix to prevent
unique constraint collisions across runs.


## Why Faker was not used

The assignment did not require advanced
fake data generation.

Using lightweight random generation kept:
- dependencies smaller
- setup simpler
- implementation easier to understand
