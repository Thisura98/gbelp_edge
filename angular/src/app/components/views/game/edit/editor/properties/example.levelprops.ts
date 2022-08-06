import { LevelPropertySection } from "../../../../../../../../../commons/src/models/game/levels/properties";

export const Example: LevelPropertySection[] = [
  {
    "section": "General",
    "properties": [
      {
        "name": "Level Difficulty",
        "type": "number",
        "hint": "The higher the value, the more difficult the game will become",
        "number": {
          "min": 0,
          "max": 10,
          "value": 0
        }
      },
      {
        "name": "Game Title",
        "type": "text",
        "text": {
          "charLimit": 10,
          "value": "Example title"
        }
      },
      {
        "name": "Character Color",
        "type": "select",
        "select": {
          "options": {
            "1": "Red",
            "2": "Green",
            "3": "Blue",
            "4": "Yellow"
          },
          "value": "2"
        }
      }
    ]
  }
];