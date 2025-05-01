from pydantic import BaseModel
from typing import Optional

class Subject(BaseModel):
    id: int
    first_name: str
    last_name: str
    dob: str
    image: Optional[str]

