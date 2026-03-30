from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str



api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise ValueError("❌ GROQ_API_KEY not found in environment")

client = OpenAI(
    api_key=api_key,
    base_url="https://api.groq.com/openai/v1"
)

def get_bot_response(user_message):
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",  # 🔥 dobry model na start
        messages=[
            {"role": "system", "content": "You are a helpful AI fitness coach."},
            {"role": "user", "content": user_message}
        ]
    )

    return response.choices[0].message.content


@app.post("/chat")
def chat(request: ChatRequest):
    reply = get_bot_response(request.message)
    return {"reply": reply}