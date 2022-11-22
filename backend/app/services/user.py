from __future__ import annotations

from fastapi import HTTPException, Response
from pydantic import UUID4, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import UserCreate, UserGet, UserPatch
from app.repositories import UserRepository


class UserService:
    @staticmethod
    async def create(db: AsyncSession, model: UserCreate) -> UserGet:
        user = await UserRepository.get_user_by_email(db, model.email)
        if user is not None:
            raise HTTPException(409, "Пользователь с таким email уже существует")
        else:
            user = await UserRepository.create(db, model)
        return UserGet.from_orm(user)

    @staticmethod
    async def get_all(db: AsyncSession, offset: int = 0, limit: int = 100) -> list[UserGet]:
        users = await UserRepository.get_all(db, offset=offset, limit=limit)
        if users is None:
            raise HTTPException(404, "Пользователи не найдены")
        return [UserGet.from_orm(s) for s in users]

    @staticmethod
    async def get(db: AsyncSession, guid: UUID4) -> UserGet:
        user = await UserRepository.get(db, guid)
        if user is None:
            raise HTTPException(404, "Пользователь не найден")
        return UserGet.from_orm(user)

    @staticmethod
    async def get_user_by_email(db: AsyncSession, email: EmailStr) -> UserGet:
        user = await UserRepository.get_user_by_email(db, email)
        if user is None:
            raise HTTPException(404, "Пользователь не найден")
        return UserGet.from_orm(user)

    @staticmethod
    async def update(db: AsyncSession, guid: UUID4, model: UserCreate) -> UserGet:
        user = await UserRepository.update(db, guid, model)
        if user is None:
            raise HTTPException(404, "Пользователь не найден")
        return UserGet.from_orm(user)

    @staticmethod
    async def patch(db: AsyncSession, guid: UUID4, model: UserPatch) -> UserGet:
        user = await UserRepository.patch(db, guid, model)
        if user is None:
            raise HTTPException(404, "Пользователь не найден")
        return UserGet.from_orm(user)

    @staticmethod
    async def delete(db: AsyncSession, guid: UUID4) -> Response(status_code=204):
        await UserRepository.delete(db, guid)
        return Response(status_code=204)
