from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine

from app.models import User
from app.models import Reminder

from app.api.user import router as user_router
from app.api.auth import router as auth_router
from app.api.reminder import router as reminder_router
from app.api.dashboard import router as dashboard_router

# ---------------------------------------
# Create Database Tables
# ---------------------------------------
Base.metadata.create_all(bind=engine)

# ---------------------------------------
# FastAPI App
# ---------------------------------------
app = FastAPI(

    title="Reminder Web API",

    description="""
## Reminder Web Application API

Features

- User Registration
- User Login
- JWT Authentication
- Reminder CRUD
- PostgreSQL Database

Author : Dineshkumar V
""",

    version="1.0.0",

    swagger_ui_parameters={
        "defaultModelsExpandDepth": -1
    }

)

# ---------------------------------------
# CORS Configuration
# ---------------------------------------
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",

    "https://reminder-pro-two.vercel.app",
    "https://reminder-dqwmw3brd-dineshkumar-vs-projects.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------
# Register Routers
# ---------------------------------------
app.include_router(user_router)
app.include_router(auth_router)
app.include_router(reminder_router)
app.include_router(dashboard_router)

# ---------------------------------------
# Home API
# ---------------------------------------
@app.get("/")
def home():

    return {
        "status": True,
        "message": "Welcome to Reminder Web API"
    }