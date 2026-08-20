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
    CareerPlanning AGENT 
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

@app.post("/api/v1/auth/login")
def login(data: AuthRequest):
    user = db.users.get(data.email)
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
    db.profiles[user.user_id] = profile.dict()
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
    db.assessments[user.user_id] = result
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
def ask_rag_assistant(
    query: str,
    user: TokenData = Depends(RoleChecker(["Student", "Mentor", "Admin"]))
):
    return {
        "query": query,
        "response": f"RAG Grounded Response: To master your target domain, start by addressing your key skill gaps and building practical portfolio projects.",
        "sources": ["SkillForge Resource Library", "Looplearn Tech Standards 2026"]
    }

@app.get("/api/v1/mentor/students")
def get_all_student_profiles(user: TokenData = Depends(RoleChecker(["Mentor", "Admin"]))):
    return {"profiles": list(db.profiles.values())}

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "SkillForge Engine"}

@app.get("/")
def read_root():
    return {"message": "SkillForge API is running! Visit /docs for Interactive API Documentation."}
