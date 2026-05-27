from pydantic import BaseModel

from app.schemas.employee import (
    EmployeeResponse,
)


# Response schema for paginated employee list
class EmployeeListResponse(BaseModel):

    items: list[EmployeeResponse]

    total: int
