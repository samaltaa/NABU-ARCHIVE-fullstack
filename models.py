from pydantic import BaseModel
from typing import Optional

class Subject(BaseModel):
    id: str
    first_name: str
    last_name: str
    dob: str
    image: str = None

