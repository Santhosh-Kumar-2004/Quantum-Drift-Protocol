import os
import httpx
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

async def generate_prompt(type_: str, level: int) -> str:
    base_prompt = {
        "challenge": f"Create a unique logic-based challenge for a sci-fi space adventure game at level {level}. Keep it clever and immersive.",
        "enemy": f"Describe a sci-fi enemy suitable for level {level}. Include its name, powers, and how it threatens the player.",
        "mystery": f"Create a mysterious sci-fi event or object at level {level}. Make it puzzling and open-ended."
    }

    prompt = base_prompt.get(type_.lower())
    if not prompt:
        raise ValueError("Invalid type. Use 'challenge', 'enemy', or 'mystery'.")

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    body = {
        "model": "llama3-70b-8192",
        "messages": [
            {"role": "system", "content": "You are a sci-fi game assistant that outputs immersive, imaginative content."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.8,
        "max_tokens": 512
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers=headers,
            json=body
        )
        response.raise_for_status()
        content = response.json()["choices"][0]["message"]["content"]
        return content

