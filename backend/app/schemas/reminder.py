from datetime import date, time
from uuid import UUID

from pydantic import BaseModel


class ReminderCreate(BaseModel):

    task_name: str
    description: str
    date: date
    time: time


class ReminderUpdate(BaseModel):
    task_name: str
    description: str
    date: date
    time: time