from fastapi import APIRouter, Depends, Path
from pydantic import UUID4
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from app.config import config
from app.database.connection import get_session
from app.services import SurveyService

router = APIRouter(prefix=config.BACKEND_PREFIX)


@router.get(
    "/survey/vote/result/{id}",
    response_description="Получить результаты опроса",
    status_code=status.HTTP_200_OK,
    description="Получить результаты опроса",
    summary="Получение результатов опроса",
    # responses={},
)
async def results(
    id: UUID4 = Path(None, description="Id опроса"),
    db: AsyncSession = Depends(get_session),
    surveys_service: SurveyService = Depends(),
):
    return await surveys_service.results(db=db, guid=id)
