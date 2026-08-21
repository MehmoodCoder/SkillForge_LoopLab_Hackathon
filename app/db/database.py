import os
from pymongo import MongoClient
from app.core.security import hash_password

# MongoDB Connection URI (Aap apne environment variable ya default local URI use kar sakte hain)
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")

client = MongoClient(MONGO_URI)
db_mongo = client["skillforge_db"]  # Database name

class MongoDatabase:
    def __init__(self):
        self.users = db_mongo["users"]
        self.profiles = db_mongo["profiles"]
        self.assessments = db_mongo["assessments"]
        
        # Default users ko MongoDB mein initialize/seed karna agar pehle se mojood na hon
        self._seed_default_users()

    def _seed_default_users(self):
        default_users = [
            {
                "user_id": "STU-101",
                "email": "student1@skillforge.com",
                "password_hash": hash_password("student123"),
                "role": "Student"
            },
            {
                "user_id": "MEN-201",
                "email": "mentor1@skillforge.com",
                "password_hash": hash_password("mentor123"),
                "role": "Mentor"
            },
            {
                "user_id": "ADM-301",
                "email": "admin1@skillforge.com",
                "password_hash": hash_password("admin123"),
                "role": "Admin"
            }
        ]

        for user in default_users:
            # Agar email pehle se database mein nahi hai toh insert kar dein
            existing = self.users.find_one({"email": user["email"]})
            if not existing:
                self.users.insert_one(user)

db = MongoDatabase()