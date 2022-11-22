from datetime import datetime

from pydantic import UUID4, BaseModel, Field

from app.models.utils import optional


class AnswerBase(BaseModel):
    title: str = Field(description="Название ответа")
    voted: int = Field(None, description="Количество проголосовавших пользователей")


class AnswerCreate(AnswerBase):
    pass


class AnswerGet(AnswerBase):
    guid: UUID4 = Field(description="Уникальный идентификатор ответа")
    created_at: datetime = Field(description="Время создания ответа")
    updated_at: datetime = Field(description="Время последнего обновления ответа")

    class Config:
        orm_mode = True


@optional
class AnswerPatch(AnswerCreate):
    pass
