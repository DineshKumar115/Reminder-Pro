import uuid

from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID

from app.core.database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    name = Column(
        String(100),
        nullable=False,
        unique=True
    )

    email = Column(
        String(255),
        nullable=False,
        unique=True
    )

    password = Column(
        String(255),
        nullable=False
    )

    phone_number = Column(
        String(15),
        nullable=False
    )

    reminders = relationship(
        "Reminder",
        back_populates="user",
        cascade="all, delete"
    )