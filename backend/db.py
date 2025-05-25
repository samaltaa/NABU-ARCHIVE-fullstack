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

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)