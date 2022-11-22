from typing import List

from fastapi import APIRouter, Depends, Path, Query, Body
from pydantic import UUID4
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from app.config import config
from app.database.connection import get_session
from app.models import AnswerCreate, AnswerGet, AnswerPatch
from app.services import AnswerService
from app.services.auth import verify_access_token

router = APIRouter(prefix=config.BACKEND_PREFIX, dependencies=[Depends(verify_access_token)])


@router.post(
    "/answer",
    response_model=AnswerGet,
    response_description="Ответ успешно создан",
    status_code=status.HTTP_201_CREATED,
    description="Создать ответа и вернуть его",
    summary="Создание ответа",
    # responses={},
)
async def create(
    id: UUID4 = Query(..., description="Id опроса"),
    model: AnswerCreate = Body(..., description="Тело ответа"),
    db: AsyncSession = Depends(get_session),
    answers_service: AnswerService = Depends(),
):
    return await answers_service.create(db=db, guid=id, model=model)


@router.get(
    "/answer",
    response_model=List[AnswerGet],
    response_description="Успешный возврат списка ответов",
    status_code=status.HTTP_200_OK,
    description="Получить ответов всех студентов",
    summary="Получение всех ответов",
    # responses={},
)
async def get_all(
    db: AsyncSession = Depends(get_session),
    limit: int = Query(100, ge=1),
    offset: int = Query(0, ge=0),
    answers_service: AnswerService = Depends(),
):
    return await answers_service.get_all(db=db, limit=limit, offset=offset)


@router.get(
    "/answer/{id}",
    response_model=AnswerGet,
    response_description="Успешный возврат ответа",
    status_code=status.HTTP_200_OK,
    description="Получить ответа по его id",
    summary="Получение ответа по id",
    # responses={},
)
async def get(
    id: UUID4 = Path(None, description="Id ответа"),
    db: AsyncSession = Depends(get_session),
    answers_service: AnswerService = Depends(),
):
    return await answers_service.get(db=db, guid=id)


@router.put(
    "/answer/{id}",
    response_model=AnswerGet,
    response_description="Успешное обновление ответа",
    status_code=status.HTTP_200_OK,
    description="Изменить ответа по его id (полное обновление модели)",
    summary="Изменение ответа по id",
    # responses={},
)
async def update(
    model: AnswerCreate,
    id: UUID4 = Path(None, description="Id ответа"),
    db: AsyncSession = Depends(get_session),
    answers_service: AnswerService = Depends(),
):
    return await answers_service.update(db=db, guid=id, model=model)


@router.patch(
    "/answer/{id}",
    response_model=AnswerGet,
    response_description="Успешное частичное обновление ответа",
    status_code=status.HTTP_200_OK,
    description="Изменить ответа по его id (частисно обновление модели)",
    summary="Изменение ответа по id (только указанные поля будут изменены)",
    # responses={},
)
async def patch(
    model: AnswerPatch,
    id: UUID4 = Path(None, description="Id ответа"),
    db: AsyncSession = Depends(get_session),
    answers_service: AnswerService = Depends(),
):
    return await answers_service.patch(db=db, guid=id, model=model)


@router.delete(
    "/answer/{id}",
    response_description="Успешное удаление ответа",
    status_code=status.HTTP_204_NO_CONTENT,
    description="Удалить ответа по его id",
    summary="Удаление ответа по id",
    # responses={},
)
async def delete(
    id: UUID4 = Path(None, description="Id ответа"),
    db: AsyncSession = Depends(get_session),
    answers_service: AnswerService = Depends(),
):
    return await answers_service.delete(db=db, guid=id)
