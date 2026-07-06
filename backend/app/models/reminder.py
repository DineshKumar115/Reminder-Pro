import uuid

from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy import Date
from sqlalchemy import Time
from sqlalchemy import Text
from sqlalchemy import ForeignKey

from sqlalchemy.orm import relationship

from sqlalchemy.dialects.postgresql import UUID

from app.core.database import Base


class Reminder(Base):

    __tablename__ = "reminders"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    task_name = Column(
        String(200),
        nullable=False
    )

    description = Column(
        Text
    )

    date = Column(
        Date,
        nullable=False
    )

    time = Column(
        Time,
        nullable=False
    )

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False
    )

    user = relationship(
        "User",
        back_populates="reminders"
    )