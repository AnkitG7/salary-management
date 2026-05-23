from fastapi import FastAPI

from app.api.employees import router as employee_router

from app.api.salary_insights import router as salary_insights_router


app = FastAPI()

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }

app.include_router(employee_router)

app.include_router(salary_insights_router)


