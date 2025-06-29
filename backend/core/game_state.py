from data.planets import planets


def get_planet_by_id(planet_id: str) -> dict:
    for planet in planets:
        if planet["planet_id"] == planet_id:
            return planet
    return None


def get_unlockable_planets(completed: list[str]) -> list[dict]:
    unlockable = []
    for planet in planets:
        if planet["planet_id"] not in completed:
            if planet["required_to_unlock"] <= len(completed):
                unlockable.append(planet)
    return unlockable
