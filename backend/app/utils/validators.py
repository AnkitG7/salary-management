from fastapi import HTTPException

from app.constants.country_currency import (
    COUNTRY_CURRENCY_MAP,
)


def validate_country_currency(
    country: str,
    currency: str,
):
    expected_currency = COUNTRY_CURRENCY_MAP.get(
        country.lower()
    )

    if expected_currency is None:
        return

    if currency.upper() != expected_currency:
        raise HTTPException(
            status_code=400,
            detail=(
                f"{country} must use "
                f"{expected_currency}"
            ),
        )
