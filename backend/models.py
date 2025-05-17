from pydantic import BaseModel, EmailStr
from typing import Optional

class Address(BaseModel):
    street: str
    city: str
    state: str
    zip_code: str

class Subject(BaseModel):
    id: str
    first_name: str
    last_name: str
    sex: str
    address: Address
    dob: str
    image: str = None

class User(BaseModel):
    first_name: str 
    last_name: str
    dob: str
    email: EmailStr
    password: str
    phone: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

    