from fastapi import FastAPI, UploadFile

app = FastAPI()
@app.post("/upload/")
async def upload_file(file: UploadFile):
    try:
        file_path = f"/Users/altagracia/Downloads/{file.filename}"
        with open(file_path, "wb") as f:
            f.write(file.file.read())
            return{"message": "File saved successfully"}
    except Exception as e:
        return {"error": str(e)}
