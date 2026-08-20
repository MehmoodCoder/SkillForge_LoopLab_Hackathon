from typing import Dict, Any
from app.core.security import hash_password

class InMemoryDatabase:
    def __init__(self):
        self.users: Dict[str, Dict[str, Any]] = {
            "student1@skillforge.com": {
                "user_id": "STU-101",
                "email": "student1@skillforge.com",
                "password_hash": hash_password("student123"),
                "role": "Student"
            },
            "mentor1@skillforge.com": {
                "user_id": "MEN-201",
                "email": "mentor1@skillforge.com",
                "password_hash": hash_password("mentor123"),
                "role": "Mentor"
            },
            "admin1@skillforge.com": {
                "user_id": "ADM-301",
                "email": "admin1@skillforge.com",
                "password_hash": hash_password("admin123"),
                "role": "Admin"
            }
        }
        self.profiles: Dict[str, Dict[str, Any]] = {}
        self.assessments: Dict[str, Dict[str, Any]] = {}

db = InMemoryDatabase()
