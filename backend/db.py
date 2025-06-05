from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()


uri = os.getenv("MONGO_URI")

# Create a new client and connect to the server
client = AsyncIOMotorClient(uri)

db= client.subjectsdb
subjects_collection = db.subjects
encodings_collection = db.encodings
users_collection = db.users

"""
TODO: 
- create a collection for biodata
- create a model for the biodata
- shape of the biodata:
{
    "subject_id": str,  # Reference to the subject
    "chromosomes": str,
    "menstrual_cycle": str,
    "blood_type": str,
    "height": str,
    "weight": str,
    "hair_color": str,
    "eye_color": str,
    }
- create a collection for the personal data
- create a model for the personal data
- shape of the personal data:
{   
    "subject_id": str,  # Reference to the subject
    "associations": str,
    "religion": str,
    "attendance": str,
    "social_media": str,
    "personal_notes": str,
    "threat_level": str,}
- create a collection for the criminal record
- create a model for the criminal record
- shape of the criminal record:
{   
    "subject_id": str,  # Reference to the subject
    "record": str,
    "home_arrest": str,
    "probation": str,
    "parole": str,
    "restraining_order": str,
    "notes": str,}
"""

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)