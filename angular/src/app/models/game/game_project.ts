export interface GameProjectResource{
    _id: string,
    filename: string,
    displayName: string,
    type: string
}

export interface GameProjectLevel{
    _id: string,
    name: string,
    type: string,
    locked: boolean,
    displayMode: string,
    exitCriteriaType: string,
    exitCriteriaValue: string | null
}

export interface GameProject{
    _id: string,
    resources: GameProjectResource[],
    levels: GameProjectLevel[]
}
