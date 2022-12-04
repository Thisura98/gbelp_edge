import { Pipe, PipeTransform } from "@angular/core";
import { GameProjectResource } from "../../../../commons/src/models/game/resources";

@Pipe({name: 'resfilter'})
export class ResourceFilterPipe implements PipeTransform{
  constructor(){

  }

  transform(value: GameProjectResource[], resourceType: string): GameProjectResource[]{
    return value.filter(v => v.type == resourceType);
  }
}