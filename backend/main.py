from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os
from dotenv import load_dotenv
from routers import game

load_dotenv()

app = FastAPI()

# Allow requests from frontend (adjust as needed later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend URL in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(game.router)

@app.get("/")
def root():
    return {"message": "Quantum Drift Protocol backend running"}

# @app.post("/test-llm")
# async def test_llm():
#     GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    
#     headers = {
#         "Authorization": f"Bearer {GROQ_API_KEY}",
#         "Content-Type": "application/json"
#     }

#     body = {
#         "model": "llama3-70b-8192",
#         "messages": [
#             {"role": "system", "content": "You are a sci-fi puzzle master for a space adventure game."},
#             {"role": "user", "content": "Give me a unique logic puzzle for level 1 of a futuristic planet exploration game."}
#         ],
#         "temperature": 0.7,
#         "max_tokens": 1024
#     }

#     try:
#         async with httpx.AsyncClient() as client:
#             response = await client.post(
#                 "https://api.groq.com/openai/v1/chat/completions",
#                 headers=headers,
#                 json=body,
#                 timeout=20
#             )
#             response.raise_for_status()
#             data = response.json()
#             return {"llm_response": data["choices"][0]["message"]["content"]}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

