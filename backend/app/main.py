from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.config import config
from app.models.exceptions import add_exception_handlers, catch_unhandled_exceptions
from app.routers.answer import router as answer_router
from app.routers.auth import router as auth_router
from app.routers.survey import router as survey_router
from app.routers.user import router as user_router
from app.routers.vote import router as vote_router

tags_metadata = [
    {"name": "auth", "description": "Авторизация"},
    {"name": "users", "description": "Работа с пользователями"},
    {"name": "surveys", "description": "Работа с опросами"},
    {"name": "votes", "description": "Работа с голосованием"},
    {"name": "answers", "description": "Работа с ответами"},
]

app = FastAPI(
    debug=config.DEBUG,
    openapi_tags=tags_metadata,
    openapi_url=f"{config.BACKEND_PREFIX}/openapi.json",
    title=config.BACKEND_TTILE,
    description=config.BACKEND_DESCRIPTION,
)

app.middleware("http")(catch_unhandled_exceptions)
add_exception_handlers(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)
app.include_router(auth_router, tags=["auth"])
app.include_router(user_router, tags=["users"])
app.include_router(survey_router, tags=["surveys"])
app.include_router(vote_router, tags=["votes"])
app.include_router(answer_router, tags=["answers"])
