import os
from enum import Enum
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field
from google import genai

# Enums & Pydantic Data Models
class SkillLevel(str, Enum):
    BEGINNER = "Beginner"
    INTERMEDIATE = "Intermediate"
    ADVANCED = "Advanced"

class TargetRole(str, Enum):
    AI_ENGINEER = "AI Engineer"
    FULLSTACK_DEV = "Fullstack Developer"
    DEVOPS_ENGINEER = "DevOps Engineer"

class StudentProfile(BaseModel):
    student_id: str
    name: str
    education: str
    skills: Dict[str, SkillLevel]
    target_role: TargetRole
    completed_projects: List[str] = Field(default_factory=list)

class SkillGapAnalysis(BaseModel):
    current_skills: Dict[str, SkillLevel]
    target_role: TargetRole
    missing_skills: List[str]
    improvement_needed: List[str]
    score_percentage: float

class LearningResource(BaseModel):
    title: str
    type: str
    url: str
    difficulty: SkillLevel

class CareerRoadmap(BaseModel):
    student_id: str
    target_role: TargetRole
    current_level_summary: str
    skill_gaps: List[str]
    recommended_topics: List[str]
    recommended_projects: List[str]
    resources: List[LearningResource]

# GenAI Engine Service using google-genai SDK
class SkillForgeGenAIEngine:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY", "")
        if api_key:
            self.client = genai.Client(api_key=api_key)
        else:
            self.client = None

    def generate_future_suggestions(self, profile: StudentProfile, assessment_score: Optional[float] = 0.0) -> Dict[str, Any]:
        """Generates personalized student career guidance using Gemini Models."""
        
        prompt = f"""
        You are an expert AI Career Mentor for technology students.
        Analyze this student's profile and provide personalized, practical career guidance:

        Student Name: {profile.name}
        Education: {profile.education}
        Target Role: {profile.target_role.value}
        Current Skills: {profile.skills}
        Recent Assessment Score: {assessment_score}%
        Completed Projects: {profile.completed_projects}

        Provide a structured breakdown:
        1. Comprehensive Career Guidance & Future Industry Suggestions.
        2. Step-by-Step Personalized Learning Roadmap.
        3. 3 Practical, Industry-Level Portfolio Projects to build next.
        """

        if not self.client:
            return {
                "student_id": profile.student_id,
                "target_role": profile.target_role.value,
                "ai_career_advice": "GEMINI_API_KEY environment variable missing. Please set GEMINI_API_KEY to activate Google GenAI suggestions.",
                "suggested_roadmap_steps": ["Learn core fundamentals", "Build hands-on projects", "Prepare portfolio"],
                "recommended_projects": ["Production Capstone Project"]
            }

        try:
            # Using latest Gemini 2.5 Flash model
            response = self.client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
            )
            
            return {
                "student_id": profile.student_id,
                "target_role": profile.target_role.value,
                "ai_career_advice": response.text,
                "suggested_roadmap_steps": [
                    "Master core missing skills highlighted in assessment.",
                    "Build dynamic capstone projects using modern web/AI frameworks.",
                    "Contribute to open-source and deploy live applications."
                ],
                "recommended_projects": [
                    f"Advanced {profile.target_role.value} Capstone Platform",
                    "RAG-powered Knowledge Base Microservice"
                ]
            }
        except Exception as e:
            return {
                "student_id": profile.student_id,
                "target_role": profile.target_role.value,
                "ai_career_advice": f"GenAI Service Error: {str(e)}",
                "suggested_roadmap_steps": [],
                "recommended_projects": []
            }

# Core Service Classes
class SkillAnalyzer:
    ROLE_REQUIREMENTS: Dict[TargetRole, Dict[str, SkillLevel]] = {
        TargetRole.AI_ENGINEER: {
            "Python": SkillLevel.ADVANCED,
            "Math & Statistics": SkillLevel.INTERMEDIATE,
            "Machine Learning": SkillLevel.INTERMEDIATE,
            "Deep Learning": SkillLevel.INTERMEDIATE,
            "Git": SkillLevel.INTERMEDIATE,
            "FastAPI": SkillLevel.INTERMEDIATE,
            "Vector Databases / RAG": SkillLevel.BEGINNER
        },
        TargetRole.FULLSTACK_DEV: {
            "JavaScript/TypeScript": SkillLevel.ADVANCED,
            "React": SkillLevel.INTERMEDIATE,
            "Python": SkillLevel.INTERMEDIATE,
            "HTML/CSS": SkillLevel.ADVANCED,
            "Git": SkillLevel.INTERMEDIATE
        },
        TargetRole.DEVOPS_ENGINEER: {
            "Linux Shell": SkillLevel.ADVANCED,
            "Docker": SkillLevel.ADVANCED,
            "Kubernetes": SkillLevel.INTERMEDIATE,
            "Terraform": SkillLevel.INTERMEDIATE,
            "Git": SkillLevel.ADVANCED
        }
    }

    LEVEL_WEIGHTS = {
        SkillLevel.BEGINNER: 1,
        SkillLevel.INTERMEDIATE: 2,
        SkillLevel.ADVANCED: 3
    }

    def __init__(self, profile: StudentProfile):
        self.profile = profile
        self.required_skills = self.ROLE_REQUIREMENTS.get(profile.target_role, {})

    def calculate_score(self) -> float:
        if not self.required_skills:
            return 0.0
        total_required = sum(self.LEVEL_WEIGHTS[lvl] for lvl in self.required_skills.values())
        student_points = 0
        for skill, req_level in self.required_skills.items():
            if skill in self.profile.skills:
                curr_level = self.profile.skills[skill]
                student_points += min(self.LEVEL_WEIGHTS[curr_level], self.LEVEL_WEIGHTS[req_level])
        return round((student_points / total_required) * 100, 2)

    def identify_gaps(self) -> SkillGapAnalysis:
        missing = []
        improvement = []
        for skill, req_level in self.required_skills.items():
            if skill not in self.profile.skills:
                missing.append(f"{skill} ({req_level.value})")
            else:
                curr_level = self.profile.skills[skill]
                if self.LEVEL_WEIGHTS[curr_level] < self.LEVEL_WEIGHTS[req_level]:
                    improvement.append(f"{skill} (Current: {curr_level.value} -> Required: {req_level.value})")
        return SkillGapAnalysis(
            current_skills=self.profile.skills,
            target_role=self.profile.target_role,
            missing_skills=missing,
            improvement_needed=improvement,
            score_percentage=self.calculate_score()
        )

class RAGKnowledgeBase:
    def __init__(self):
        self._knowledge_db = {
            TargetRole.AI_ENGINEER: [
                LearningResource(
                    title="Deep Learning Specialization",
                    type="Course",
                    url="https://coursera.org/deep-learning",
                    difficulty=SkillLevel.INTERMEDIATE
                ),
                LearningResource(
                    title="FastAPI Official Docs - Async Core",
                    type="Documentation",
                    url="https://fastapi.tiangolo.com/",
                    difficulty=SkillLevel.BEGINNER
                ),
                LearningResource(
                    title="LangChain & RAG Architectures",
                    type="Article",
                    url="https://docs.langchain.com",
                    difficulty=SkillLevel.ADVANCED
                )
            ]
        }

    def search_resources(self, target_role: TargetRole) -> List[LearningResource]:
        return self._knowledge_db.get(target_role, [])

class CareerPlanningAgent:
    def __init__(self, rag_engine: RAGKnowledgeBase):
        self.rag_engine = rag_engine

    def run_agent_workflow(self, profile: StudentProfile) -> CareerRoadmap:
        analyzer = SkillAnalyzer(profile)
        gap_analysis = analyzer.identify_gaps()
        resources = self.rag_engine.search_resources(profile.target_role)
        
        projects = {
            TargetRole.AI_ENGINEER: [
                "Build an AI Document Q&A Bot using FastAPI and FAISS",
                "Deploy an Agentic AI Tool with LangGraph & Docker"
            ],
            TargetRole.FULLSTACK_DEV: [
                "Real-time Dashboard with React & FastAPI",
                "E-Commerce Microservices Platform"
            ],
            TargetRole.DEVOPS_ENGINEER: [
                "Kubernetes Multi-Node Cluster Setup via Terraform",
                "Automated CI/CD Pipeline with GitHub Actions"
            ]
        }

        all_gaps = gap_analysis.missing_skills + gap_analysis.improvement_needed

        return CareerRoadmap(
            student_id=profile.student_id,
            target_role=profile.target_role,
            current_level_summary=f"Readiness Score: {gap_analysis.score_percentage}%",
            skill_gaps=all_gaps,
            recommended_topics=[g.split(" (")[0] for g in all_gaps],
            recommended_projects=projects.get(profile.target_role, ["Portfolio Project"]),
            resources=resources
        )

# Global Instances
genai_engine = SkillForgeGenAIEngine()
