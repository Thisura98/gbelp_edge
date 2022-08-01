import { LevelPropsSectionsJSONSchema, LevelPropsItemsJSONSchema, LevelPropsSectionsJSONSchemaURI } from "../../../../../../../../../commons/src/models/game/levels/properties/schemas";

export interface IMonacoLevelProperties{
  uri: string;
  fileMatch?: string[];
  schema?: any
}

export function getMonacoLevelPropsTextModel(modelURI: monaco.Uri): IMonacoLevelProperties{

  let schema = LevelPropsSectionsJSONSchema;
  schema.items.properties.properties.items = LevelPropsItemsJSONSchema;

  return {
    uri: LevelPropsSectionsJSONSchemaURI,
    fileMatch: [modelURI.toString()],
    schema: schema
  }
}