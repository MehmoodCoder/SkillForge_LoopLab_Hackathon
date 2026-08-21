import os
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    RoleChecker,
    TokenData
)
from app.db.database import db
from app.services.skill_engine import (
    StudentProfile,
    SkillGapAnalysis,
    CareerRoadmap,
    SkillAnalyzer,
    RAGKnowledgeBase,
    CareerPlanningAgent,
    genai_engine
)

app = FastAPI(
    title="SkillForge API Engine",
    version="1.0.0",
    description="Backend for Looplearn Hackathon 2026 PS-03 Project"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

rag_kb = RAGKnowledgeBase()
career_agent = CareerPlanningAgent(rag_engine=rag_kb)

class AuthRequest(BaseModel):
    email: str
    password: str

class AssessmentSubmitRequest(BaseModel):
    python_score: int
    web_score: int
    git_score: int

class RAGQueryRequest(BaseModel):
    query: str

@app.post("/api/v1/auth/login")
def login(data: AuthRequest):
    user = db.users.find_one({"email": data.email})
    if not user or not verify_password(data.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    token = create_access_token(data={"sub": user["user_id"], "role": user["role"]})
    return {"access_token": token, "token_type": "bearer", "role": user["role"]}

@app.post("/api/v1/student/profile", response_model=StudentProfile)
def create_or_update_profile(
    profile: StudentProfile,
    user: TokenData = Depends(RoleChecker(["Student"]))
):
    db.profiles.update_one(
        {"student_id": user.user_id},
        {"$set": profile.model_dump()},
        upsert=True
    )
    return profile

@app.post("/api/v1/student/assessment")
def submit_assessment(
    data: AssessmentSubmitRequest,
    user: TokenData = Depends(RoleChecker(["Student"]))
):
    total_score = data.python_score + data.web_score + data.git_score
    max_score = 30
    percentage = round((total_score / max_score) * 100, 2)
    
    result = {
        "student_id": user.user_id,
        "score": total_score,
        "max_score": max_score,
        "percentage": percentage
    }
    
    db.assessments.update_one(
        {"student_id": user.user_id},
        {"$set": result},
        upsert=True
    )
    return result

@app.post("/api/v1/student/analyze-skills", response_model=SkillGapAnalysis)
def analyze_skills(
    profile: StudentProfile,
    user: TokenData = Depends(RoleChecker(["Student"]))
):
    analyzer = SkillAnalyzer(profile)
    return analyzer.identify_gaps()

@app.post("/api/v1/student/generate-roadmap", response_model=CareerRoadmap)
def generate_roadmap(
    profile: StudentProfile,
    user: TokenData = Depends(RoleChecker(["Student"]))
):
    return career_agent.run_agent_workflow(profile)

@app.post("/api/v1/ai/rag-assistant")
def ask_rag_assistant(request: RAGQueryRequest):
    if genai_engine.client:
        try:
            response = genai_engine.client.models.generate_content(
                model="gemini-3.6-flash",  
                contents=request.query,
            )
            ai_text = response.text
        except Exception as e:
            ai_text = f"AI Error: {str(e)}"
    else:
        ai_text = "Gemini API key is not configured in the backend environment."

    return {
        "query": request.query,
        "response": ai_text,
        "sources": ["SkillForge Knowledge Base", "Google GenAI"]
    }

@app.get("/api/v1/mentor/students")
def get_all_student_profiles(user: TokenData = Depends(RoleChecker(["Mentor", "Admin"]))):
    all_profiles = list(db.profiles.find({}, {"_id": 0}))
    return {"profiles": all_profiles}

@app.get("/health")
def health_code():
    return {"status": "ok", "service": "SkillForge Engine"}

@app.get("/")
def read_root():
    return {"message": "SkillForge API is running! Visit /docs for Interactive API Documentation."}