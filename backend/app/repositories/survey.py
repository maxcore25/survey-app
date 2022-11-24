from typing import List

from fastapi import HTTPException
from pydantic import UUID4
from sqlalchemy import BigInteger, delete, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.sql.expression import cast

from app.database.tables import Answer, Survey
from app.models import SurveyCreate, SurveyPatch, SurveyVote
from app.repositories.answer import AnswerRepository
from app.repositories.user import UserRepository


class SurveyRepository:
    @staticmethod
    async def create(db: AsyncSession, model: SurveyCreate) -> Survey:
        survey = Survey(
            title=model.title,
            description=model.description,
            question=model.question,
            points=model.points,
            category=model.category,
            answers=list(),
        )
        for ans in model.answers:
            answer_object = Answer(
                title=ans.title,
            )
            survey.answers.append(answer_object)
        db.add(survey)
        await db.commit()
        await db.refresh(survey)
        return survey

    @staticmethod
    async def get_all(db: AsyncSession, offset: int = 0, limit: int = 100) -> List[Survey]:
        res = await db.execute(select(Survey).offset(cast(offset, BigInteger)).limit(limit))
        return res.scalars().unique().all()

    @staticmethod
    async def get(db: AsyncSession, guid: UUID4) -> Survey:
        res = await db.execute(select(Survey).where(Survey.guid == guid).limit(1))
        return res.scalar()

    @staticmethod
    async def update(db: AsyncSession, guid: UUID4, model: SurveyCreate) -> Survey:
        survey = await SurveyRepository.get(db, guid)

        if survey is None:
            raise HTTPException(404, "Опрос не найден")

        await db.execute(update(Survey).where(Survey.guid == guid).values(**model.dict(exclude_unset=True, exclude={"answers"})))
        await db.commit()
        await db.refresh(survey)

        return survey

    @staticmethod
    async def patch(db: AsyncSession, guid: UUID4, model: SurveyPatch) -> Survey:
        survey = await SurveyRepository.get(db, guid)

        if survey is None:
            raise HTTPException(404, "Опрос не найден")

        if model is None or not model.dict(exclude_unset=True):
            raise HTTPException(400, "Должно быть задано хотя бы одно новое поле модели")

        await db.execute(update(Survey).where(Survey.guid == guid).values(**model.dict(exclude_unset=True, exclude={"answers"})))
        
        for ans in model.answers:
            await AnswerRepository.patch(db, ans.guid, ans)
            
        await db.commit()
        await db.refresh(survey)

        return survey

    @staticmethod
    async def delete(db: AsyncSession, guid: UUID4) -> None:
        await db.execute(delete(Survey).where(Survey.guid == guid))
        await db.commit()

    @staticmethod
    async def vote(db: AsyncSession, guid: UUID4, user: UUID4, model: SurveyVote) -> Survey:
        survey = await SurveyRepository.get(db, guid)
        answer = await AnswerRepository.get(db, model.answer_id)
        user = await UserRepository.get(db, user)

        if survey is None:
            raise HTTPException(404, "Опрос не найден")

        if model is None or not model.dict(exclude_unset=True):
            raise HTTPException(400, "Должно быть задано хотя бы одно новое поле модели")

        survey.voted += 1
        answer.voted += 1
        user.points += survey.points

        await db.commit()
        await db.refresh(answer)
        await db.refresh(survey)
        await db.refresh(user)

        return survey
