from typing import List

from fastapi import APIRouter, Depends, Path, Query
from pydantic import UUID4
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from app.config import config
from app.database.connection import get_session
from app.models import SurveyCreate, SurveyGet, SurveyPatch
from app.services import SurveyService
from app.services.auth import verify_access_token

router = APIRouter(prefix=config.BACKEND_PREFIX, dependencies=[Depends(verify_access_token)])


@router.post(
    "/survey",
    response_model=SurveyGet,
    response_description="Опрос успешно создан",
    status_code=status.HTTP_201_CREATED,
    description="Создать опроса и вернуть его",
    summary="Создание опроса",
    # responses={},
)
async def create(
    model: SurveyCreate,
    db: AsyncSession = Depends(get_session),
    surveys_service: SurveyService = Depends(),
):
    return await surveys_service.create(db=db, model=model)


@router.get(
    "/survey",
    response_model=List[SurveyGet],
    response_description="Успешный возврат списка опросов",
    status_code=status.HTTP_200_OK,
    description="Получить опросов всех студентов",
    summary="Получение всех опросов",
    # responses={},
)
async def get_all(
    db: AsyncSession = Depends(get_session),
    limit: int = Query(100, ge=1),
    offset: int = Query(0, ge=0),
    surveys_service: SurveyService = Depends(),
):
    return await surveys_service.get_all(db=db, limit=limit, offset=offset)


@router.get(
    "/survey/{id}",
    response_model=SurveyGet,
    response_description="Успешный возврат опроса",
    status_code=status.HTTP_200_OK,
    description="Получить опроса по его id",
    summary="Получение опроса по id",
    # responses={},
)
async def get(
    id: UUID4 = Path(None, description="Id опроса"),
    db: AsyncSession = Depends(get_session),
    surveys_service: SurveyService = Depends(),
):
    return await surveys_service.get(db=db, guid=id)


@router.put(
    "/survey/{id}",
    response_model=SurveyGet,
    response_description="Успешное обновление опроса",
    status_code=status.HTTP_200_OK,
    description="Изменить опроса по его id (полное обновление модели)",
    summary="Изменение опроса по id",
    # responses={},
)
async def update(
    model: SurveyCreate,
    id: UUID4 = Path(None, description="Id опроса"),
    db: AsyncSession = Depends(get_session),
    surveys_service: SurveyService = Depends(),
):
    return await surveys_service.update(db=db, guid=id, model=model)


@router.patch(
    "/survey/{id}",
    response_model=SurveyGet,
    response_description="Успешное частичное обновление опроса",
    status_code=status.HTTP_200_OK,
    description="Изменить опроса по его id (частисно обновление модели)",
    summary="Изменение опроса по id (только указанные поля будут изменены)",
    # responses={},
)
async def patch(
    model: SurveyPatch,
    id: UUID4 = Path(None, description="Id опроса"),
    db: AsyncSession = Depends(get_session),
    surveys_service: SurveyService = Depends(),
):
    return await surveys_service.patch(db=db, guid=id, model=model)


@router.delete(
    "/survey/{id}",
    response_description="Успешное удаление опроса",
    status_code=status.HTTP_204_NO_CONTENT,
    description="Удалить опроса по его id",
    summary="Удаление опроса по id",
    # responses={},
)
async def delete(
    id: UUID4 = Path(None, description="Id опроса"),
    db: AsyncSession = Depends(get_session),
    surveys_service: SurveyService = Depends(),
):
    return await surveys_service.delete(db=db, guid=id)
