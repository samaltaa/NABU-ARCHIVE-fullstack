from fastapi import FastAPI, UploadFile, APIRouter, HTTPException, Form, File
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from  bson import ObjectId
from models import Subject, Address
from motor.motor_asyncio import AsyncIOMotorClient
import base64


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

uri = "mongodb+srv://altagrasa80900:ZoaGJ6JncTaOoSrc@cluster0.q0yt2ex.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

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
        
        # Return the inserted document with the ID as a string
        document["_id"] = str(result.inserted_id)
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

app.include_router(router)