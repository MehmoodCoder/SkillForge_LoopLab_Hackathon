import requests

BASE_URL = "http://127.0.0.1:5000"

# 1. Login
login_res = requests.post(f"{BASE_URL}/api/v1/auth/login", json={
    "email": "student1@skillforge.com",
    "password": "student123"
})

print("Login Status Code:", login_res.status_code)
token = login_res.json().get("access_token")
headers = {"Authorization": f"Bearer {token}"}

# 2. Test GenAI AI Endpoint
student_data = {
    "student_id": "STU-101",
    "name": "Ali Hassan",
    "education": "Software Engineering",
    "skills": {
        "Python": "Intermediate"
    },
    "target_role": "AI Engineer",
    "completed_projects": ["Portfolio Website"]
}

print("AI Response Request Bhej Rahe Hain...")
ai_res = requests.post(f"{BASE_URL}/api/v1/student/llm-suggestions", json=student_data, headers=headers)

print("\n--- SERVER STATUS CODE ---")
print(ai_res.status_code)

print("\n--- FULL RESPONSE DATA ---")
print(ai_res.json())
