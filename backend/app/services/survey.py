from __future__ import annotations

import io

import matplotlib.pyplot as plt
from fastapi import HTTPException, Response
from pydantic import UUID4
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import SurveyCreate, SurveyGet, SurveyPatch, SurveyVote
from app.repositories import SurveyRepository


class SurveyService:
    @staticmethod
    async def create(db: AsyncSession, model: SurveyCreate) -> SurveyGet:
        survey = await SurveyRepository.create(db, model)
        return SurveyGet.from_orm(survey)

    @staticmethod
    async def get_all(db: AsyncSession, offset: int = 0, limit: int = 100) -> list[SurveyGet]:
        surveys = await SurveyRepository.get_all(db, offset=offset, limit=limit)
        if surveys is None:
            raise HTTPException(404, "Опросы не найдены")
        return [SurveyGet.from_orm(s) for s in surveys]

    @staticmethod
    async def get(db: AsyncSession, guid: UUID4) -> SurveyGet:
        survey = await SurveyRepository.get(db, guid)
        if survey is None:
            raise HTTPException(404, "Опрос не найден")
        return SurveyGet.from_orm(survey)

    @staticmethod
    async def update(db: AsyncSession, guid: UUID4, model: SurveyCreate) -> SurveyGet:
        survey = await SurveyRepository.update(db, guid, model)
        if survey is None:
            raise HTTPException(404, "Опрос не найден")
        return SurveyGet.from_orm(survey)

    @staticmethod
    async def patch(db: AsyncSession, guid: UUID4, model: SurveyPatch) -> SurveyGet:
        survey = await SurveyRepository.patch(db, guid, model)
        if survey is None:
            raise HTTPException(404, "Опрос не найден")
        return SurveyGet.from_orm(survey)

    @staticmethod
    async def delete(db: AsyncSession, guid: UUID4) -> Response(status_code=204):
        await SurveyRepository.delete(db, guid)
        return Response(status_code=204)

    @staticmethod
    async def vote(db: AsyncSession, guid: UUID4, user: UUID4, model: SurveyVote) -> SurveyGet:
        survey = await SurveyRepository.vote(db, guid, user, model)
        if survey is None:
            raise HTTPException(404, "Опрос не найден")
        return SurveyGet.from_orm(survey)

    @staticmethod
    async def results(db: AsyncSession, guid: UUID4) -> Response:
        survey = await SurveyRepository.get(db, guid)
        fig, ax = plt.subplots()

        answers = [answer.title for answer in survey.answers]
        voted = [answer.voted for answer in survey.answers]

        ax.bar(answers, voted)
        ax.set_ylabel("Amount of votes")
        ax.set_title(f"Vote results for {guid}")

        survey_bar = io.BytesIO()
        plt.savefig(survey_bar, format="png")
        survey_bar.seek(0)
        return Response(content=survey_bar.read(), media_type="image/png")
