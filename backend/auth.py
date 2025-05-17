from fastapi import APIRouter, HTTPException
from models import User, UserLogin
from utils import *
from db import users_collection

router = APIRouter

@router.post("/register")
def register(user: User):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = user.dict()
    new_user["password"] = hash_password(new_user["password"])
    users_collection.insert_one(new_user)
    return {"status_code": 200, "message": "User registered successfully"}

@router.post("/login")
def login(user: UserLogin):
    found = users_collection.find_one({"email": user.email})
    if not found or not verify_password(user.password, found["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    token = create_token({"email": found["email"]})
    return {"access_token": token}