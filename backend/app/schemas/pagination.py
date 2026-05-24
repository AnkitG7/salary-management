from pydantic import BaseModel

from app.schemas.employee import (
    EmployeeResponse,
)


class EmployeeListResponse(
    BaseModel
):
    items: list[
        EmployeeResponse
    ]

    total: int
