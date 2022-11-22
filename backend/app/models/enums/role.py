from app.models.enums import BaseEnum


class Role(str, BaseEnum):
    USER = "user"
    ADMIN = "admin"
