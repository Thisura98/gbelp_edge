import { LevelPropertiesJSONSchema } from "../../../../../../../../../commons/src/models/game/levels/properties";

export interface IMonacoLevelProperties{
  uri: string;
  fileMatch?: string[];
  schema?: any
}

export function getMonacoLevelPropertiesTextModel(modelURI: monaco.Uri): IMonacoLevelProperties{
  return {
    uri: 'https://edgeelp.online/schema/level-properties.shema.json',
    fileMatch: [modelURI.toString()],
    schema: LevelPropertiesJSONSchema
  }
}