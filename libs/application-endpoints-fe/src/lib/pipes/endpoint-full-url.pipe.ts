import { inject, Pipe, PipeTransform } from "@angular/core";
import { CORE_ENGINE_PREFIX, FE_HOST_URL } from "@api-assistant/commons-fe";

@Pipe({
  name: "endpointFullUrl",
  standalone: true,
})
export class EndpointFullUrlPipe implements PipeTransform {

  private readonly hostUrl: string = inject(FE_HOST_URL);

  transform(endpointPath: string): string {
    return `${this.hostUrl}${CORE_ENGINE_PREFIX}${endpointPath}`;
  }
}
