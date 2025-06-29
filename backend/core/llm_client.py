import os
import httpx
import json
from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")


def get_structured_prompt(type_: str, level: int) -> str:
    prompts = {
        "challenge": f"""
You are a game engine for a sci-fi logic-based adventure. Generate a unique challenge for Level {level}.

Return valid JSON only:
- title
- description
- difficulty
- puzzle_type
- clues (list)
- solution
- fail_message
""",
        "enemy": f"""
You are a sci-fi game designer. Create a unique enemy for Level {level}.

Return valid JSON only:
- name
- description
- abilities (list)
- weaknesses (list)
- threat_level
- encounter_message
""",
        "mystery": f"""
You are a sci-fi world-builder. Design a space mystery for Level {level}.

Return valid JSON only:
- title
- location
- description
- observations (list)
- unanswered_questions (list)
- risks (list)
- opportunities (list)
"""
    }

    return prompts.get(type_.lower())


async def generate_prompt(type_: str, level: int) -> dict:
    prompt = get_structured_prompt(type_, level)
    if not prompt:
        raise ValueError("Invalid type. Use 'challenge', 'enemy', or 'mystery'.")

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    body = {
        "model": "llama3-70b-8192",
        "messages": [
            {"role": "system", "content": "You are a sci-fi game assistant that returns structured JSON only."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.8,
        "max_tokens": 512
    }

    async with httpx.AsyncClient() as client:
        for attempt in range(2):  # max 1 retry
            try:
                response = await client.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers=headers,
                    json=body,
                    timeout=15
                )
                response.raise_for_status()
                content = response.json()["choices"][0]["message"]["content"]

                return json.loads(content)

            except (httpx.HTTPStatusError, httpx.TimeoutException) as e:
                if attempt == 1:
                    raise HTTPException(status_code=502, detail="LLM service unavailable. Try again.")
            except json.JSONDecodeError:
                if attempt == 1:
                    raise HTTPException(status_code=500, detail="LLM returned invalid JSON.")
