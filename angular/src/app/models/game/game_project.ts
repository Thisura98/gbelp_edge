export interface GameProjectResource{
    _id: string,
    filename: string,
    type: string
}

export interface GameProject{
    _id: string,
    resources: GameProjectResource[]
}
