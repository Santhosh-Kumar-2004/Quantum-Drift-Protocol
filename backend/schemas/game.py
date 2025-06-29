from pydantic import BaseModel
from typing import List, Optional, Literal

class PromptRequest(BaseModel):
    type: str  # challenge, enemy, mystery
    level: int

class StartResponse(BaseModel):
    message: str

# Response schemas
class GameEvent(BaseModel):
    title: str
    description: str

class PlayRequest(BaseModel):
    user_id: str
    planet_id: str
    level: int

class PlayResponse(BaseModel):
    planet_id: str
    planet_name: str
    difficulty: str
    challenges: List[GameEvent]
    enemies: List[GameEvent]
    mysteries: List[GameEvent]



class Puzzle(BaseModel):
    puzzle_type: Literal["riddle", "pattern", "logic"]
    title: str
    question: str
    choices: List[str]
    answer: str

class PuzzleResponse(BaseModel):
    puzzle: Puzzle
