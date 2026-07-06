from uuid import UUID

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status

from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.core.auth import get_current_user

from app.models.user import User

from app.schemas.reminder import ReminderCreate
from app.schemas.reminder import ReminderUpdate

from app.repository import reminder_repository

router = APIRouter(
    prefix="/reminders",
    tags=["Reminders"]
)


# ---------------------------------------
# Create Reminder
# ---------------------------------------
@router.post(
    "",
    status_code=status.HTTP_201_CREATED
)
def create_reminder(
    reminder: ReminderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    new_reminder = reminder_repository.create_reminder(
        db=db,
        reminder=reminder,
        user=current_user
    )

    return {
        "status": True,
        "message": "Reminder Created Successfully",
        "data": {
            "id": str(new_reminder.id),
            "task_name": new_reminder.task_name,
            "description": new_reminder.description,
            "date": str(new_reminder.date),
            "time": str(new_reminder.time),
            "user_id": str(new_reminder.user_id)
        }
    }


# ---------------------------------------
# Get All Reminders
# ---------------------------------------
@router.get("")
def get_all_reminders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    reminders = reminder_repository.get_all_reminders(
        db=db,
        user=current_user
    )

    reminder_list = []

    for reminder in reminders:

        reminder_list.append({
            "id": str(reminder.id),
            "task_name": reminder.task_name,
            "description": reminder.description,
            "date": str(reminder.date),
            "time": str(reminder.time),
            "user_id": str(reminder.user_id)
        })

    return {
        "status": True,
        "message": "Reminders Retrieved Successfully",
        "count": len(reminder_list),
        "data": reminder_list
    }


# ---------------------------------------
# Get Reminder By ID
# ---------------------------------------
@router.get("/{reminder_id}")
def get_reminder_by_id(
    reminder_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    reminder = reminder_repository.get_reminder_by_id(
        db=db,
        reminder_id=reminder_id
    )

    if reminder is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reminder Not Found"
        )

    if reminder.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access Denied"
        )

    return {
        "status": True,
        "message": "Reminder Retrieved Successfully",
        "data": {
            "id": str(reminder.id),
            "task_name": reminder.task_name,
            "description": reminder.description,
            "date": str(reminder.date),
            "time": str(reminder.time),
            "user_id": str(reminder.user_id)
        }
    }


# ---------------------------------------
# Update Reminder
# ---------------------------------------
@router.put("/{reminder_id}")
def update_reminder(
    reminder_id: UUID,
    reminder: ReminderUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    db_reminder = reminder_repository.get_reminder_by_id(
        db=db,
        reminder_id=reminder_id
    )

    if db_reminder is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reminder Not Found"
        )

    if db_reminder.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access Denied"
        )

    updated_reminder = reminder_repository.update_reminder(
        db=db,
        reminder_id=reminder_id,
        reminder=reminder
    )

    return {
        "status": True,
        "message": "Reminder Updated Successfully",
        "data": {
            "id": str(updated_reminder.id),
            "task_name": updated_reminder.task_name,
            "description": updated_reminder.description,
            "date": str(updated_reminder.date),
            "time": str(updated_reminder.time),
            "user_id": str(updated_reminder.user_id)
        }
    }


# ---------------------------------------
# Delete Reminder
# ---------------------------------------
@router.delete("/{reminder_id}")
def delete_reminder(
    reminder_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    reminder = reminder_repository.get_reminder_by_id(
        db=db,
        reminder_id=reminder_id
    )

    if reminder is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reminder Not Found"
        )

    if reminder.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access Denied"
        )

    reminder_repository.delete_reminder(
        db=db,
        reminder_id=reminder_id
    )

    return {
        "status": True,
        "message": "Reminder Deleted Successfully"
    }