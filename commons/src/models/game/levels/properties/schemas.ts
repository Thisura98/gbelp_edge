

export const LevelPropsSectionsJSONSchemaURI = 'http://edgeelp.online/schema/levelprops-sections.json';

export const LevelPropsSectionsJSONSchema = {
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "section": { "type": "string" },
            "properties": {
                "type": "array",
                "items": {}         //   LevelPropsItemsJSONSchema
            },
            "required": ["section", "properties"]
        }
    }
};

export const LevelPropsItemsJSONSchema = {
    "type": "object",
    "properties": {
        "id": { "type": "string" },
        "name": { "type": "string" },
        "hint": { "type": "string" },
        "type": { "enum": ['number', 'text', 'select', "template", "break", "resource", "level"] },

        "number": {
            "type": "object",
            "properties": {
                "min": { "type": "number" },
                "max": { "type": "number" },
                "value": { "type": "number" }
            },
            "required": ["min", "max"]
        },

        "text": {
            "type": "object",
            "properties": {
                "charLimit": { "type": "number" },
                "value": { "type": "string" }
            },
            "required": ["charLimit"]
        },

        "select": {
            "type": "object",
            "properties": {
                "options": { 
                    "type": "object",
                    "additionalProperties": { "type": "string" }
                },
                "value": { "type": "string" },
            },
            "required": ["options"]
        }
        // TODO
    },
    "required": ["name", "type"]
}