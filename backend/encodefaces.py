import face_recognition
import io
from bson import ObjectId
from fastapi import FastAPI, APIRouter, HTTPException, Form, UploadFile, File
from db import encodings_collection as collection
#connect to MongoDB using motor make sure you 
# initiate the client using motor otherwise async will not work

app = FastAPI()
router = APIRouter()


async def process_and_store_encodings(subject_oid: ObjectId, image_bytes: bytes):

    try:
        #this line loads the image from the bytes
        image = face_recognition.load_image_file(io.BytesIO(image_bytes))
        face_locations = face_recognition.face_locations(image)
        face_encodings = face_recognition.face_encodings(image, face_locations)

        if not face_encodings:
            print(f"No face found for subject {subject_oid}")
            return False
        
        encoding = face_encodings[0]

        # Store encoding in its own collection
        await collection.insert_one({
            "subject_id": subject_oid,
            "encoding": encoding.tolist() # this converts numpy array to list
        })

        return True
    except Exception as e:
        print(f"Error processing face for subject {subject_oid}: {e}")
        return False