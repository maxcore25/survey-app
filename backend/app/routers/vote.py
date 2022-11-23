from fastapi import APIRouter, Depends, Path
from pydantic import UUID4
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from app.config import config
from app.database.connection import get_session
from app.models import SurveyGet, SurveyVote
from app.services import SurveyService
from app.services.auth import get_user_from_access_token, verify_access_token

router = APIRouter(prefix=config.BACKEND_PREFIX, dependencies=[Depends(verify_access_token)])


@router.post(
    "/survey/vote/{id}",
    response_model=SurveyGet,
    response_description="Проголосовать в опросе",
    status_code=status.HTTP_201_CREATED,
    description="Проголосовать в опросе и вернуть его",
    summary="Голосование в опросе",
    # responses={},
)
async def vote(
    model: SurveyVote,
    id: UUID4 = Path(None, description="Id опроса"),
    user: UUID4 = Depends(get_user_from_access_token),
    db: AsyncSession = Depends(get_session),
    surveys_service: SurveyService = Depends(),
):
    return await surveys_service.vote(db=db, guid=id, user=user, model=model)
