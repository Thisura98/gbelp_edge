export interface GameProjectResource{
    _id: string,
    filename: string,
    displayName: string,
    type: string
}

export interface GameProject{
    _id: string,
    resources: GameProjectResource[]
}
