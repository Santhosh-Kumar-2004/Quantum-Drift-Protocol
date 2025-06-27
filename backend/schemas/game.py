from pydantic import BaseModel
from typing import List

# For POST /prompt
class PromptRequest(BaseModel):
    type: str  # "challenge", "enemy", or "mystery"
    level: int

# For GET /start
class StartResponse(BaseModel):
    message: str

