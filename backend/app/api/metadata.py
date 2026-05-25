from fastapi import APIRouter

from app.constants.country_currency import (
    COUNTRY_CURRENCY_MAP,
)

router = APIRouter(
    tags=["Metadata"],
)


@router.get(
    "/metadata/countries",
)
def get_country_currency_mapping():
    return [
        {
            "country": country,
            "currency": currency,
        }
        for country, currency in (
            COUNTRY_CURRENCY_MAP.items()
        )
    ]
