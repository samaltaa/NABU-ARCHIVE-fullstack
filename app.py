from fastapi import FastAPI, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware to handle cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload/")
async def upload_file(file: UploadFile):
    try:
        file_path = f"/Users/altagracia/Downloads/{file.filename}"
        with open(file_path, "wb") as f:
            f.write(file.file.read())
        
        # Return the URL path to access the uploaded file
        return {
            "message": "File saved successfully",
            "url": f"/uploads/{file.filename}"  # This matches the StaticFiles mount point
        }
    except Exception as e:
        return {"error": str(e)}

app.mount("/uploads/", StaticFiles(directory="/Users/altagracia/Downloads"), name="uploads")