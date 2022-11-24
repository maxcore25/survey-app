from typing import List

from fastapi import APIRouter, Depends, Path, Query
from pydantic import UUID4, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from app.config import config
from app.database.connection import get_session
from app.models import UserCreate, UserGet, UserPatch
from app.services import UserService
from app.services.auth import get_user_from_access_token, verify_access_token

router = APIRouter(prefix=config.BACKEND_PREFIX, dependencies=[Depends(verify_access_token)])


@router.post(
    "/user",
    response_model=UserGet,
    response_model_exclude={"password"},
    response_description="Пользователь успешно создан",
    status_code=status.HTTP_201_CREATED,
    description="Создать пользователя и вернуть его",
    summary="Создание пользователя",
    # responses={},
)
async def create(
    model: UserCreate,
    db: AsyncSession = Depends(get_session),
    users_service: UserService = Depends(),
):
    return await users_service.create(db=db, model=model)


@router.get(
    "/user",
    response_model=List[UserGet],
    response_model_exclude={"password"},
    response_description="Успешный возврат списка пользователей",
    status_code=status.HTTP_200_OK,
    description="Получить пользователей всех студентов",
    summary="Получение всех пользователей",
    # responses={},
)
async def get_all(
    db: AsyncSession = Depends(get_session),
    limit: int = Query(100, ge=1),
    offset: int = Query(0, ge=0),
    users_service: UserService = Depends(),
):
    return await users_service.get_all(db=db, limit=limit, offset=offset)


@router.get(
    "/user/me",
    response_model=UserGet,
    response_model_exclude={"password"},
    response_description="Успешный возврат пользователя",
    status_code=status.HTTP_200_OK,
    description="Получить свои данные",
    summary="Получение своих данных",
    # responses={},
)
async def get(
    user: UUID4 = Depends(get_user_from_access_token),
    db: AsyncSession = Depends(get_session),
    users_service: UserService = Depends(),
):
    return await users_service.get(db=db, guid=user)


@router.get(
    "/user/{id}",
    response_model=UserGet,
    response_model_exclude={"password"},
    response_description="Успешный возврат пользователя",
    status_code=status.HTTP_200_OK,
    description="Получить пользователя по его id",
    summary="Получение пользователя по id",
    # responses={},
)
async def get(
    id: UUID4 = Path(None, description="Id пользователя"),
    db: AsyncSession = Depends(get_session),
    users_service: UserService = Depends(),
):
    return await users_service.get(db=db, guid=id)


@router.get(
    "/user/email/{email}",
    response_model=UserGet,
    response_model_exclude={"password"},
    response_description="Успешный возврат пользователя",
    status_code=status.HTTP_200_OK,
    description="Получить пользователя по его email",
    summary="Получение пользователя по email",
    # responses={},
)
async def get(
    email: EmailStr = Path(None, description="Email пользователя"),
    db: AsyncSession = Depends(get_session),
    users_service: UserService = Depends(),
):
    return await users_service.get_user_by_email(db=db, email=email)


@router.put(
    "/user/{id}",
    response_model=UserGet,
    response_model_exclude={"password"},
    response_description="Успешное обновление пользователя",
    status_code=status.HTTP_200_OK,
    description="Изменить пользователя по его id (полное обновление модели)",
    summary="Изменение пользователя по id",
    # responses={},
)
async def update(
    model: UserCreate,
    id: UUID4 = Path(None, description="Id пользователя"),
    db: AsyncSession = Depends(get_session),
    users_service: UserService = Depends(),
):
    return await users_service.update(db=db, guid=id, model=model)


@router.patch(
    "/user/{id}",
    response_model=UserGet,
    response_model_exclude={"password"},
    response_description="Успешное частичное обновление пользователя",
    status_code=status.HTTP_200_OK,
    description="Изменить пользователя по его id (частисно обновление модели)",
    summary="Изменение пользователя по id (только указанные поля будут изменены)",
    # responses={},
)
async def patch(
    model: UserPatch,
    id: UUID4 = Path(None, description="Id пользователя"),
    db: AsyncSession = Depends(get_session),
    users_service: UserService = Depends(),
):
    return await users_service.patch(db=db, guid=id, model=model)


@router.delete(
    "/user/{id}",
    response_description="Успешное удаление пользователя",
    status_code=status.HTTP_204_NO_CONTENT,
    description="Удалить пользователя по его id",
    summary="Удаление пользователя по id",
    # responses={},
)
async def delete(
    id: UUID4 = Path(None, description="Id пользователя"),
    db: AsyncSession = Depends(get_session),
    users_service: UserService = Depends(),
):
    return await users_service.delete(db=db, guid=id)
