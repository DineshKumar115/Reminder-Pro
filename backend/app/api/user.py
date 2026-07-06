from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.schemas.user import UserCreate
from app.repository import user_repository

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    """
    Register a new user.
    """

    # Check if username already exists
    existing_user = user_repository.get_user_by_name(
        db=db,
        name=user.name
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username already exists"
        )

    # Check if email already exists
    existing_email = user_repository.get_user_by_email(
        db=db,
        email=user.email
    )

    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already exists"
        )

    # Create User
    new_user = user_repository.create_user(
        db=db,
        user=user
    )

    return {
    "status": True,
    "message": "Successfully Registered",
    "data": {
        "user_id": str(new_user.id),
        "name": new_user.name,
        "email": new_user.email
    }
}