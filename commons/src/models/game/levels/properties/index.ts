// Note: Keep Schemas in the 'schemas' file up-to-date
// with interface definitions.

export interface NumberProperties {
    min: number;
    max: number;
    value?: number;
}

export interface TextProperties {
    charLimit: number;
    value?: string;
}

export interface SelectProperties {
    options: { [key: string]: string };
    value?: string;
}

export interface TemplateProperties {
    template: LevelProperty;
    templateIndexer: string;
    templateRepeatOn: string;
}

export interface ResourceProperties {
    resourceType: 'sprite' | 'sound';
    resourceId?: string;
}

export interface LevelPropertyProperties {
    levelId?: string;
}

export interface LevelProperty {
    id?: string;
    name: string;
    hint?: string;
    type: 'number' | 'text' | 'select' | 'template' | 'break' | 'resource' | 'level';

    number?: NumberProperties;
    text?: TextProperties;
    select?: SelectProperties;
    template?: TemplateProperties;
    resource?: ResourceProperties;
    level?: LevelPropertyProperties;
}

export class LevelPropertySection {
    constructor(
        public section: string,
        public properties: LevelProperty[]
    ) { }
}

export class LevelProperties {
    constructor(
        public properties: LevelPropertySection[],
        public propertyValues: { [id: string]: any }
    ) { }
}

// export const LevelPropertiesJSONSchema = {
//     "type": "object",
//     "properties": {
//         "id": { "type": "string" },
//         "name": { "type": "string" },
//         "hint": { "type": "string" },
//         "type": { "enum": ['number', 'text', 'select', 'template', 'break', 'resource', 'level'] },
//     },
//     "required": ["name", "type"]
// };