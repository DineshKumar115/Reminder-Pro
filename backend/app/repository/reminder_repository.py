from uuid import UUID

from sqlalchemy.orm import Session

from app.models.reminder import Reminder
from app.models.user import User

from app.schemas.reminder import ReminderCreate
from app.schemas.reminder import ReminderUpdate


# ---------------------------------------
# Create Reminder
# ---------------------------------------
def create_reminder(
    db: Session,
    reminder: ReminderCreate,
    user: User
):

    new_reminder = Reminder(
        task_name=reminder.task_name,
        description=reminder.description,
        date=reminder.date,
        time=reminder.time,
        user_id=user.id
    )

    db.add(new_reminder)
    db.commit()
    db.refresh(new_reminder)

    return new_reminder


# ---------------------------------------
# Get Logged In User Reminders
# ---------------------------------------
def get_all_reminders(
    db: Session,
    user: User
):

    return db.query(Reminder).filter(
        Reminder.user_id == user.id
    ).all()


# ---------------------------------------
# Get Reminder By ID
# ---------------------------------------
def get_reminder_by_id(
    db: Session,
    reminder_id: UUID
):

    return db.query(Reminder).filter(
        Reminder.id == reminder_id
    ).first()


# ---------------------------------------
# Update Reminder
# ---------------------------------------
def update_reminder(
    db: Session,
    reminder_id: UUID,
    reminder: ReminderUpdate
):

    db_reminder = db.query(Reminder).filter(
        Reminder.id == reminder_id
    ).first()

    if db_reminder is None:
        return None

    db_reminder.task_name = reminder.task_name
    db_reminder.description = reminder.description
    db_reminder.date = reminder.date
    db_reminder.time = reminder.time

    db.commit()
    db.refresh(db_reminder)

    return db_reminder


# ---------------------------------------
# Delete Reminder
# ---------------------------------------
def delete_reminder(
    db: Session,
    reminder_id: UUID
):

    db_reminder = db.query(Reminder).filter(
        Reminder.id == reminder_id
    ).first()

    if db_reminder is None:
        return None

    db.delete(db_reminder)
    db.commit()

    return db_reminder