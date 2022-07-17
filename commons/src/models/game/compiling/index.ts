export class CompileMessage{
  public constructor(
    public message: string
  ){}
}

export class CompileStatus{
  public constructor(
    messages: CompileMessage[]
  ){}
}