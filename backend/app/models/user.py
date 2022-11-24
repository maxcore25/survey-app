from datetime import datetime
from typing import Optional

from pydantic import UUID4, BaseModel, EmailStr, Field

from app.models.utils import optional


class UserBase(BaseModel):
    email: EmailStr = Field(description="Email пользователя")
    first_name: str = Field(description="Имя пользователя")
    last_name: str = Field(description="Фамилия пользователя")
    middle_name: Optional[str] = Field(None, description="Отчество пользователя(при наличии)")
    role: str = Field("user", description="Роль пользователя")


class UserCreate(UserBase):
    password: str = Field(description="Пароль пользователя")


class UserGet(UserBase):
    guid: UUID4 = Field(description="Уникальный идентификатор пользователя")
    points: int = Field(description="Баллы пользователя")
    is_deleted: bool = Field(False, description="Активен ли пользователь")
    created_at: datetime = Field(description="Время создания пользователя")
    updated_at: datetime = Field(description="Время последнего обновления пользователя")

    class Config:
        orm_mode = True


@optional
class UserPatch(UserBase):
    pass
