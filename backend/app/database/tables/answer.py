import uuid

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.database.connection import Base


class Answer(Base):
    __tablename__ = "answer"

    guid = Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True, index=True, unique=True)
    survey_guid = Column(UUID(as_uuid=True), ForeignKey("survey.guid"))
    survey = relationship("Survey", back_populates="answers", uselist=False, lazy="joined")
    title = Column(String, nullable=False)
    voted = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
