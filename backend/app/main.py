from fastapi import FastAPI

from app.api.employees import router as employee_router

from app.api.salary_insights import router as salary_insights_router

from fastapi.middleware.cors import CORSMiddleware

from app.api.metadata import (
    router as metadata_router,
)

app = FastAPI(
    title="Salary Management API",

    description="""
HR-focused salary management system.

Features:
- Employee CRUD operations
- Salary analytics
- Country/job-title insights
- Pagination and filtering
- Employee distribution metrics

Built using:
- FastAPI
- PostgreSQL
- SQLAlchemy
- Pytest
- TDD approach
""",

    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.get("/health")
# def health_check():
#     return {
#         "status": "healthy"
#     }


@app.get(
    "/health",
    tags=["Health"]
)
def health_check():
    return {
        "status": "healthy"
    }

app.include_router(metadata_router,
                    tags=["Metadata"])


app.include_router(
    employee_router,
    tags=["Employees"],
)

app.include_router(
    salary_insights_router,
    tags=["Salary Insights"],
)
