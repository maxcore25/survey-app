from datetime import datetime

from pydantic import UUID4, BaseModel, Field

from app.models.utils import optional


class AnswerBase(BaseModel):
    title: str = Field(description="Название ответа")


class AnswerCreate(AnswerBase):
    pass


class AnswerGet(AnswerBase):
    guid: UUID4 = Field(description="Уникальный идентификатор ответа")
    voted: int = Field(None, description="Количество проголосовавших пользователей")
    created_at: datetime = Field(description="Время создания ответа")
    updated_at: datetime = Field(description="Время последнего обновления ответа")

    class Config:
        orm_mode = True


@optional
class AnswerPatch(AnswerCreate):
    pass
