from fastapi import FastAPI, UploadFile, APIRouter, HTTPException, Form, File 
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from bson import ObjectId
from models import Subject, Address
import base64
from db import subjects_collection as collection
from encodefaces import process_and_store_encodings
from models import User, UserLogin
from utils import *
from db import users_collection
from jose import JWTError, jwt

#web socket imports
from fastapi import WebSocket, WebSocketDisconnect
from utils import recognize_face_from_frame
import json


app = FastAPI()
router = APIRouter() 

# Add CORS middleware to handle cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@router.get("/subjects/", response_model=List[Subject])
async def get_subjects():
    try:
        subjects = await collection.find().to_list(length=10)
        result = []
        for subject in subjects:
            # Convert _id to string
            subject["_id"] = str(subject["_id"])
            
            # Convert id to string if it exists and is not already a string
            if "id" in subject and not isinstance(subject["id"], str):
                subject["id"] = str(subject["id"])
                
            # Handle image if it's in bytes
            if isinstance(subject.get("image"), bytes):
                subject["image"] = base64.b64encode(subject["image"]).decode('utf-8')
                
            result.append(subject)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/subjects/", response_model=Subject)
async def add_subject(
    id: str = Form(...),
    first_name: str = Form(...),
    last_name: str = Form(...),
    sex: str = Form(...),
    street: str = Form(...),
    city: str = Form(...),
    state: str = Form(...),
    zip_code: str = Form(...),
    dob: str = Form(...),
    image: UploadFile = File(...),
):  
    if sex not in ["Male", "Female"]:
        raise HTTPException(status_code=422, detail="Sex must be binary")

    address = Address(
        street=street, 
        city=city, 
        state=state,
        zip_code=zip_code,)
    content = await image.read()
    encoded_image = base64.b64encode(content).decode("utf-8")

    try:
        document = {
            "id": id,
            "first_name": first_name,
            "last_name": last_name,
            "sex": sex,
            "address": address.dict(),
            "dob": dob,
            "image": encoded_image
        }

        result = await collection.insert_one(document)
        mongo_id = result.inserted_id
        

        # Return the inserted document with the ID as a string
        document["_id"] = str(result.inserted_id)
        await process_and_store_encodings(subject_oid=mongo_id, image_bytes=content)
        return Subject(
            id=id,
            first_name=first_name,
            last_name=last_name,
            sex=sex,
            address=address,
            dob=dob,
            image=encoded_image
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/subjects/{subject_id}")
async def get_subject_by_id(subject_id: str):
    try:
        result = await collection.find_one({"_id": ObjectId(subject_id)})
        if not result:
            raise HTTPException(status_code=404, detail="Subject not found")
        result["_id"] = str(result["_id"])

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.put("/subjects/{subject_id}")
async def update_subject(subject_id: str, updated_subject: Subject):
    try:
        result = collection.update_one(
            {"_id": ObjectId(subject_id)},
            {"$set": updated_subject.dict()}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Subject not found")
        return {"status_code": 200, "message": "Subject updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.delete("/subjects/{subject_id}")
async def delete_subject(subject_id: str):
    try:
        result = collection.delete_one({"_id": ObjectId(subject_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Subject not found")
        return {"status_code": 200, "message": "Subject deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/register/")
async def register(user: User):
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = user.dict()
    new_user["password"] = hash_password(new_user["password"])
    await users_collection.insert_one(new_user)

    return {"status_code": 200, "message": "User registered successfully", }

@router.post("/login/")
async def login(user: UserLogin):
    found = await users_collection.find_one({"email": user.email})
    if not found or not verify_password(user.password, found["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    token = create_token({"email": found["email"]})
    return {"access_token": token}

# WebSovket endpoint 
@router.websocket("/ws/recognize")
async def websocket_recognize(websocket: WebSocket):
    await websocket.accept()
    
    try:
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            image_b64 = payload.get("image")

            if not image_b64:
                await websocket.send_json({"error": "No image provided"})
                continue

            result = recognize_face_from_frame(image_b64)

            if result:
                await websocket.send_json(result)
            else:
                await websocket.send_json({"match": False, "message": "Unknown face"})

    except WebSocketDisconnect:
        print("WebSocket disconnected")

app.include_router(router)