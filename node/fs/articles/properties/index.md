# Properties

## Introduction

Properties are a way for template creators to specify game parameters, and for teachers to easily change the behavior of their games.

<figure align="center">
    <img src="<server_path>/fs/articles/properties/properties_editor.png" width="90%">
    <figcaption>The EDGE Properties Editor screen</figcaption>
</figure>

- On the left side, game creators can specify the properties of their game using JSON code.

- On the right side, teachers (and creators) can change the values for the available properties.

<br/>

## Specifying Properties

Only game creators will see the panel on the left side. It allows you to specify all the available properties of your game.

1. First create a Section. A section logically groups properties together.
2. Inside a section, you can specifify your properties using an array.

```json
[
    {
        "section": "General",
        "properties": [ ]
    }
]
```

All properties have the following attributes:

- name
- type
- hint (optional)

Depending on the 'type' of the property, you can specify additional constraints for that property type. For example a number type property:

```json
[
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
            }
        ]
    }
]
```

> IMPORTANT: When you change your JSON object, if it is valid, the preview on the right side will update automatically. The preview will __NOT UPDATE__ if your object is invalid. In this case you will see a small error where the error has occured:

<figure align="center">
    <img src="<server_path>/fs/articles/properties/properties_validation.png" width="80%">
    <figcaption>Property Validation using JSON Schema</figcaption>
</figure>

## Property Types

| Property Type | Options |
|-----------|---------|
| number    | min, max, value |    
| text      | charLimit, value |
| select    | options, value |

<br/>

### Examples

- __Number__: Show a number input
```js
{
    "name": "Level Difficulty",
    "type": "number",
    "hint": "Increase difficulty of levels",
    "number": {
        "min": 0,
        "max": 10,
        "value": 0
    }
}
```

- __Text__: Show a text input
```js
{
    "name": "Game Title",
    "type": "text",
    "text": {
        "charLimit": 10,
        "value": "Example title"
    }
}
```

-  __Select__: Show a selection dropdown
```js
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
```