import { LevelPropertySection } from "../../../../../../../../../commons/src/models/game/levels/properties";

export const Example: LevelPropertySection[] = [
  {
    "section": "General",
    "properties": [
      {
        "name": "Game Title",
        "type": "number",
        "number": {
          "min": 0,
          "max": 10,
          "defaultNumber": 0
        }
      },
      {
        "name": "Game Title",
        "type": "number",
        "number": {
          "min": 0,
          "max": 10,
          "defaultNumber": 0
        }
      },
      {
        "name": "Test",
        "type": "select",
        "select": {
          "options": {
            "k": "hello"
          }
        }
      }
    ]
  }
];