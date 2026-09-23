from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional, Any, Dict
import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

app = FastAPI()

# 1. CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Supabase Client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Resume Data Save Route
@app.post("/api/resume")
async def save_resume(data: Dict[str, Any]):
    try:
        response = supabase.table("resumes").insert({"full_data": data}).execute()
        return {"status": "success", "message": "Resume saved successfully to Supabase database!"}
    except Exception as e:
        print("Supabase Error:", str(e))
        raise HTTPException(status_code=500, detail=str(e))