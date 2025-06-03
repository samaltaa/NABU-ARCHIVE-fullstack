from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import face_recognition
import numpy as np
import base64
from io import BytesIO
from PIL import Image
from db import subjects_collection

SECRET_KEY = "your-secret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return password_context.hash(password)

def verify_password(plain, hashed):
    return password_context.verify(plain, hashed)

def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None
    
def decode_image(base64_str):
    image_data = base64.b64decode(base64_str.split(",")[1])
    return np.array(Image.open(BytesIO(image_data)))

async def recognize_face_from_frame(image_b64):
    image = decode_image(image_b64)
    unknown_encodings = face_recognition.face_encodings(image)
    
    if not unknown_encodings:
        return None 
    
    unknown_encoding = unknown_encodings[0]

    subjects = await subjects_collection.find({}).to_list(length=None)
    known_encodings = [np.array(s["face_encoding"]) for s in subjects]
    names = [s["first_name"] for s in subjects]

    distances = face_recognition.face_distance(known_encodings, unknown_encoding)
    min_distance = np.min(distances)

    if min_distance < 0.6:  # Threshold for comparison 
        match_index = distances.tolist().index(min_distance)
        return {
            "match": True,
            "name": names[match_index],
            "_id": str(subjects[match_index]["_id"]),
        }
    return None
