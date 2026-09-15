from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from supabase import create_client, Client

# Supabase Client
supabase: Client = create_client(
    supabase_url="https://qjmansvgtylohrnhylor.supabase.co",
    supabase_key="sb_publishable_Y0syaP3jmDFCCVzlR8-fvg_i_AKbsaU"
)

app = FastAPI()

# CORS Middleware 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Resume Data 
class PersonalInfo(BaseModel):
    fullName: Optional[str] = ""
    email: Optional[str] = ""
    phone: Optional[str] = ""
    location: Optional[str] = ""

class Education(BaseModel):
    id: str
    school: Optional[str] = ""
    degree: Optional[str] = ""
    year: Optional[str] = ""

class Experience(BaseModel):
    id: str
    role: Optional[str] = ""
    company: Optional[str] = ""
    startDate: Optional[str] = ""
    endDate: Optional[str] = ""

class Project(BaseModel):
    id: str
    title: Optional[str] = ""
    description: Optional[str] = ""

class ResumeData(BaseModel):
    personalInfo: PersonalInfo
    education: List[Education] = []
    experience: List[Experience] = []
    skills: List[str] = []
    projects: List[Project] = []


# 2. Root Get API
@app.get("/")
def read_root():
    return {"message": "Resume Builder Backend is running successfully! 🚀"}


# 3. Save Resume POST API
@app.post("/api/resume")
def save_resume(resume: ResumeData):
   
    print("Received Resume Data:", resume)

    try:
    
        response = supabase.table("resumes").insert({"full_data": resume.dict()}).execute()
        print("Data inserted into Supabase successfully:", response)
    except Exception as e:
        print("Error saving to Supabase:", str(e))
    
    return {
        "status": "success",
        "message": "Resume data saved successfully!",
        "data": resume
    }
