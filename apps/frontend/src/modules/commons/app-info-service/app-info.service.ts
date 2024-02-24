import { Injectable } from "@angular/core";

/**
 * Holds common information about the application
 */
@Injectable({
    providedIn: "root"
})
export class AppInfoService {
    private readonly _appName: string = "API Assistant";

    private readonly _appCaption: string = "Declarative Backend for trivial apps"

    get appName() {
        return this._appName;
    }

    get appCaption() {
        return this._appCaption;
    }

}