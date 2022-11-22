from __future__ import annotations

from fastapi import HTTPException, Response
from pydantic import UUID4
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import AnswerCreate, AnswerGet, AnswerPatch
from app.repositories import AnswerRepository, SurveyRepository


class AnswerService:
    @staticmethod
    async def create(db: AsyncSession, guid: UUID4, model: AnswerCreate) -> AnswerGet:
        survey = await SurveyRepository.get(db, guid)
        if survey is None:
            raise HTTPException(404, "Опрос не найден")
        answer = await AnswerRepository.create(db, model)
        return AnswerGet.from_orm(answer)

    @staticmethod
    async def get_all(db: AsyncSession, offset: int = 0, limit: int = 100) -> list[AnswerGet]:
        answers = await AnswerRepository.get_all(db, offset=offset, limit=limit)
        if answers is None:
            raise HTTPException(404, "Ответы не найдены")
        return [AnswerGet.from_orm(a) for a in answers]

    @staticmethod
    async def get(db: AsyncSession, guid: UUID4) -> AnswerGet:
        answer = await AnswerRepository.get(db, guid)
        if answer is None:
            raise HTTPException(404, "Ответ не найден")
        return AnswerGet.from_orm(answer)

    @staticmethod
    async def update(db: AsyncSession, guid: UUID4, model: AnswerCreate) -> AnswerGet:
        answer = await AnswerRepository.update(db, guid, model)
        if answer is None:
            raise HTTPException(404, "Ответ не найден")
        return AnswerGet.from_orm(answer)

    @staticmethod
    async def patch(db: AsyncSession, guid: UUID4, model: AnswerPatch) -> AnswerGet:
        answer = await AnswerRepository.patch(db, guid, model)
        if answer is None:
            raise HTTPException(404, "Ответ не найден")
        return AnswerGet.from_orm(answer)

    @staticmethod
    async def delete(db: AsyncSession, guid: UUID4) -> Response(status_code=204):
        await AnswerRepository.delete(db, guid)
        return Response(status_code=204)
