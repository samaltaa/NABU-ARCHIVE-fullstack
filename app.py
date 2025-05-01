from fastapi import FastAPI, UploadFile, APIRouter, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from  bson import ObjectId
from models import Subject
from motor.motor_asyncio import AsyncIOMotorClient


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

uri = "db uri"

# Create a new client and connect to the server
client = AsyncIOMotorClient(uri)

db= client.subjectsdb
collection = db.subjects

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

@router.get("/subjects/", response_model=List[Subject])
async def get_subjects():
    try:
        subjects = await collection.find().to_list(length=10)
        return subjects #if it doesnt work use schema
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/subjects/")
async def create_subject(new_subject: Subject):
    try:
        result = await collection.insert_one(new_subject.dict())
        return {"status_code": 200, "id": str(result.inserted_id)}
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

app.include_router(router)