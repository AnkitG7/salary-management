from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.employees import router as employee_router
from app.api.metadata import router as metadata_router
from app.api.salary_insights import (
    router as salary_insights_router,
)


# Create FastAPI application instance
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

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check endpoint
@app.get(
    "/health",
    tags=["Health"]
)
def health_check():
    return {
        "status": "healthy"
    }


# Register metadata routes
app.include_router(
    metadata_router,
    tags=["Metadata"],
)

# Register employee routes
app.include_router(
    employee_router,
    tags=["Employees"],
)

# Register salary insights routes
app.include_router(
    salary_insights_router,
    tags=["Salary Insights"],
)
