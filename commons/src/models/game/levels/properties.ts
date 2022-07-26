export interface NumberProperties{
    min: number;
    max: number;
    defaultNumber: number;
}

export interface TextProperties{
    charLimit: number;
    defaultString: string;
}

export interface SelectProperties{
    options: { [key: string] : object };
}

export interface TemplateProperties{
    template: LevelProperty;
    templateIndexer: string;
    templateRepeatOn: string;
}

export interface ResourceProperties{
    resourceType: 'sprite' | 'sound';
    resourceId: string | null;
}

export interface LevelPropertyProperties{
    levelId: string | null;
}

export interface LevelProperty{
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

export class LevelPropertySection{
    constructor(
        public section: string,
        public properties: LevelProperty[]
    ){}
}

export class LevelProperties{
    constructor(
        public propertyFormHTML: string,
        public propertyValues: { [id: string] : any }
    ){}
}