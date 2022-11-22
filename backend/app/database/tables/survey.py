import uuid

from sqlalchemy import Boolean, Column, DateTime, Integer, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.database.connection import Base


class Survey(Base):
    __tablename__ = "survey"

    guid = Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True, index=True, unique=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    question = Column(String, nullable=False)
    voted = Column(Integer, nullable=False)
    points = Column(Integer, nullable=False)
    category = Column(String, nullable=False)
    answers = relationship("Answer", back_populates="survey", uselist=True, lazy="joined")
    is_active = Column(Boolean, default=True)
    is_deleted = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
