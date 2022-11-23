from datetime import datetime
from typing import Optional

from pydantic import UUID4, BaseModel, Field

from app.models.answer import AnswerCreate, AnswerGet
from app.models.utils import optional


class SurveyBase(BaseModel):
    title: str = Field(description="Название опроса")
    description: str = Field(description="Описание опроса")
    question: str = Field(description="Вопрос опроса")
    points: int = Field(description="Баллы за опрос")
    category: str = Field(description="Категория опроса")


class SurveyCreate(SurveyBase):
    answers: list[AnswerCreate] = Field(description="Список ответов")


class SurveyGet(SurveyBase):
    guid: UUID4 = Field(description="Уникальный идентификатор опроса")
    voted: int = Field(description="Количество проголосовавших пользователей")
    is_active: bool = Field(description="Активен ли опрос")
    answers: list[AnswerGet] = Field(description="Список ответов")
    is_deleted: bool = Field(False, description="Удален ли опрос")
    created_at: datetime = Field(description="Время создания опроса")
    updated_at: datetime = Field(description="Время последнего обновления опроса")

    class Config:
        orm_mode = True


@optional
class SurveyPatch(SurveyBase):
    answers: Optional[list[AnswerCreate]] = Field(None, description="Список ответов")
    is_active: Optional[bool] = Field(None, description="Активен ли опрос")


class SurveyVote(BaseModel):
    answer_id: UUID4 = Field(description="Уникальный идентификатор ответа")
