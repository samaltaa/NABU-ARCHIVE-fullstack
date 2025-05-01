@router.post("/subjects/")
async def create_subject(
    id: int = Form(...),
    first_name: str = Form(...),
    last_name: str = Form(...),
    dob: str = Form(...),
    image: UploadFile = File(...),
):
    
    try:
        image_data = await image.read()

        document = {
            "id": id,
            "first_name": first_name,
            "last_name": last_name,
            "dob": dob,
            "image": image_data
        }

        result = await collection.insert_one(document)
        return {"status_code": 200, "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))