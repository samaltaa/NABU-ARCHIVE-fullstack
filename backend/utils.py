from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import face_recognition
import numpy as np
import base64
from io import BytesIO
from PIL import Image
from db import subjects_collection
from db import encodings_collection

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
    try:
        image = decode_image(image_b64)
        unknown_encodings = face_recognition.face_encodings(image)
        
        if not unknown_encodings:
            print("No face detected in the image")
            return None 
        
        unknown_encoding = unknown_encodings[0]

        # Get subjects and encodings from separate collections
        subjects = await subjects_collection.find({}).to_list(length=None)
        encodings = await encodings_collection.find({}).to_list(length=None)
        
        print(f"Found {len(subjects)} subjects and {len(encodings)} encodings")
        
        # Create a mapping of subject_id to encoding
        encoding_map = {}
        for enc in encodings:
            encoding_map[enc["subject_id"]] = enc["encoding"]
        
        # Match subjects with their encodings
        matched_subjects = []
        known_encodings = []
        names = []
        
        for subject in subjects:
            subject_id = subject["_id"]
            if subject_id in encoding_map:
                try:
                    # Get the encoding array and convert to numpy array
                    encoding_array = encoding_map[subject_id]
                    known_encodings.append(np.array(encoding_array))
                    names.append(subject["first_name"])
                    matched_subjects.append(subject)
                except Exception as e:
                    print(f"Error processing encoding for {subject.get('first_name', 'Unknown')}: {e}")
                    continue
            else:
                print(f"No encoding found for subject {subject.get('first_name', 'Unknown')}")
        
        if not known_encodings:
            print("No valid encodings found")
            return None

        print(f"Processing {len(known_encodings)} face encodings")
        
        # Compare faces
        distances = face_recognition.face_distance(known_encodings, unknown_encoding)
        min_distance = np.min(distances)
        
        print(f"Min distance: {min_distance}")

        if min_distance < 0.6:  # Threshold for comparison 
            match_index = distances.tolist().index(min_distance)
            matched_subject = matched_subjects[match_index]
            print(f"Match found: {names[match_index]} with distance {min_distance}")
            return {
                "match": True,
                "name": names[match_index],
                "_id": str(matched_subject["_id"]),
                "confidence": float(1 - min_distance)
            }
        else:
            print(f"No match found. Min distance {min_distance} > threshold 0.6")
            return None
            
    except Exception as e:
        print(f"Error in recognize_face_from_frame: {e}")
        import traceback
        traceback.print_exc()
        return None