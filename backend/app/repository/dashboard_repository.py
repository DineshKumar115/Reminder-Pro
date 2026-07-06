from datetime import date

from sqlalchemy.orm import Session

from app.models.reminder import Reminder


def get_dashboard_data(
    db: Session,
    user_id: int
):

    today = date.today()

    reminders = db.query(Reminder).filter(
        Reminder.user_id == user_id
    ).all()

    total_reminders = len(reminders)

    today_tasks = db.query(Reminder).filter(
        Reminder.user_id == user_id,
        Reminder.date == today
    ).all()

    today_reminders = len(today_tasks)

    upcoming_tasks = db.query(Reminder).filter(
        Reminder.user_id == user_id,
        Reminder.date > today
    ).all()

    upcoming_reminders = len(upcoming_tasks)

    return {
        "total_reminders": total_reminders,
        "today_reminders": today_reminders,
        "upcoming_reminders": upcoming_reminders,
        "today_tasks": today_tasks
    }