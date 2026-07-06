from uuid import UUID

from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from fastapi.security import HTTPBearer
from fastapi.security import HTTPAuthorizationCredentials

from jose import jwt
from jose import JWTError

from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.core.security import SECRET_KEY
from app.core.security import ALGORITHM

from app.models.user import User

security = HTTPBearer(
    bearerFormat="JWT"
)


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    token = credentials.credentials

    print("=" * 60)
    print("TOKEN RECEIVED:")
    print(token)
    print("=" * 60)

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        print("JWT PAYLOAD :", payload)

        user_id = payload.get("sub")

        print("USER ID :", user_id)

        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Token"
            )

    except JWTError as e:

        print("=" * 60)
        print("JWT ERROR :", str(e))
        print("=" * 60)

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )

    user = db.query(User).filter(
        User.id == UUID(user_id)
    ).first()

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User Not Found"
        )

    return user