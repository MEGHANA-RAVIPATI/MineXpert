from api import router as api_router
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

import models
from database import engine, get_db
from auth import router as auth_router


# Create database tables
models.Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="MineXpert API",
    description="Mining Management and Inspection Compliance System",
    version="1.0.0"
)


# Authentication routes
app.include_router(auth_router)
app.include_router(api_router)


@app.get("/")
def home():
    return {
        "message": "MineXpert Backend API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.get("/database-test")
def database_test(db: Session = Depends(get_db)):

    users = db.query(models.User).count()

    return {
        "database": "connected",
        "users_count": users
    }