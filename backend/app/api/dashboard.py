from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.core.auth import get_current_user

from app.models.user import User

from app.repository.dashboard_repository import get_dashboard_data

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("")
def get_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    dashboard = get_dashboard_data(
        db=db,
        user_id=current_user.id
    )

    return {
        "status": True,
        "message": "Dashboard Loaded Successfully",
        "data": dashboard
    }