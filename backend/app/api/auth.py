from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.dependencies import get_db

from app.schemas.auth import LoginRequest

from app.repository import auth_repository

from app.core.security import verify_password
from app.core.security import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/login")
def login(
    request: LoginRequest,
    db: Session = Depends(get_db)
):

    user = auth_repository.authenticate_user(
        db=db,
        email=request.email
    )

    if user is None:

        raise HTTPException(
            status_code=401,
            detail="Invalid Email or Password"
        )

    if not verify_password(
        request.password,
        user.password
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid Email or Password"
        )

    token = create_access_token(

        {
            "sub": str(user.id)
        }

    )

    return {

        "status": True,

        "access_token": token,

        "token_type": "Bearer",

        "user": {

            "id": str(user.id),

            "name": user.name,

            "email": user.email

        }

    }