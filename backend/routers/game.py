from fastapi import APIRouter, HTTPException
from schemas.game import PromptRequest, StartResponse
from core.llm_client import generate_prompt

router = APIRouter()


@router.get("/start", response_model=StartResponse)
async def start_game():
    return {"message": "Welcome to Quantum Drift Protocol! Choose your planet and begin your journey."}

@router.post("/prompt")
async def get_prompt(request: PromptRequest):
    try:
        result = await generate_prompt(request.type, request.level)
        return {"result": result}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

