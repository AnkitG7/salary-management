from fastapi import HTTPException

from app.constants.country_currency import (
    COUNTRY_CURRENCY_MAP,
)


# Validate country and currency combination
def validate_country_currency(
    country: str,
    currency: str,
):

    # Get expected currency for country
    expected_currency = (
        COUNTRY_CURRENCY_MAP.get(
            country.lower()
        )
    )

    # Skip validation for unsupported countries
    if expected_currency is None:
        return

    # Raise error if currency does not match expected value
    if currency.upper() != expected_currency:

        raise HTTPException(
            status_code=400,

            detail=(
                f"{country} must use "
                f"{expected_currency}"
            ),
        )
