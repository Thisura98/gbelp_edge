import { Pipe, PipeTransform } from "@angular/core";
import { ApiService } from "../services/api.service";

/**
 * Use `{{ someString | resurl }}` to transform standard
 * file system resource urls into valid URLs
 */
@Pipe({name: 'resurl'})
export class ResourceUrlTransformPipe implements PipeTransform{

    constructor(
        private apiService: ApiService
    ){}

    transform(value: string): string{
        return this.apiService.getFileSystemBaseURL() + "/" + value;
    }
}