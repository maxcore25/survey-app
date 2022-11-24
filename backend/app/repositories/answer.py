from typing import List

from fastapi import HTTPException
from pydantic import UUID4
from sqlalchemy import BigInteger, delete, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.sql.expression import cast

from app.database.tables import Answer
from app.models import AnswerCreate, AnswerPatch


class AnswerRepository:
    @staticmethod
    async def create(db: AsyncSession, model: AnswerCreate) -> Answer:
        answer = Answer(**model.dict(exclude_unset=True))
        db.add(answer)
        await db.commit()
        await db.refresh(answer)
        return answer

    @staticmethod
    async def get_all(db: AsyncSession, offset: int = 0, limit: int = 100) -> List[Answer]:
        res = await db.execute(select(Answer).offset(cast(offset, BigInteger)).limit(limit))
        return res.scalars().unique().all()

    @staticmethod
    async def get(db: AsyncSession, guid: UUID4) -> Answer:
        res = await db.execute(select(Answer).where(Answer.guid == guid).limit(1))
        return res.scalar()

    @staticmethod
    async def update(db: AsyncSession, guid: UUID4, model: AnswerCreate) -> Answer:
        answer = await AnswerRepository.get(db, guid)

        if answer is None:
            raise HTTPException(404, "Ответ не найден")

        await db.execute(update(Answer).where(Answer.guid == guid).values(**model.dict()))
        await db.commit()
        await db.refresh(answer)

        return answer

    @staticmethod
    async def patch(db: AsyncSession, guid: UUID4, model: AnswerPatch) -> Answer:
        answer = await AnswerRepository.get(db, guid)

        if answer is None:
            raise HTTPException(404, "Ответ не найден")

        if model is None or not model.dict(exclude_unset=True):
            raise HTTPException(400, "Должно быть задано хотя бы одно новое поле модели")

        await db.execute(update(Answer).where(Answer.guid == guid).values(**model.dict()))
        await db.commit()
        await db.refresh(answer)

        return answer

    @staticmethod
    async def delete(db: AsyncSession, guid: UUID4) -> None:
        await db.execute(delete(Answer).where(Answer.guid == guid))
        await db.commit()
