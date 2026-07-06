from pydantic import BaseModel
from datetime import date
from datetime import time


class TodayReminder(BaseModel):

    id: int
    task_name: str
    description: str
    date: date
    time: time

    class Config:
        from_attributes = True


class DashboardResponse(BaseModel):

    total_reminders: int
    today_reminders: int
    upcoming_reminders: int

    today_tasks: list[TodayReminder]