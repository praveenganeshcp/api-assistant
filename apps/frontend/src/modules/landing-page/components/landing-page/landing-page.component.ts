import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { authUserSelector } from "../../../accounts/store/accounts.selectors";

interface LandingPageFeatureCard {
    id: number;
    title: string;
    description: string;
}

@Component({
    selector: "api-assistant-landing-page",
    templateUrl: "./landing-page.component.html",
    styleUrls: ["./landing-page.component.scss"]
})
export class LandingPageComponent {

    constructor(
        private store: Store
    ) {}

    public authenticatedUser$ = this.store.select(authUserSelector);
    
    public LANDING_PAGE_FEATURES: LandingPageFeatureCard[] = [
        {
            id: 1,
            title: "Queries on Frontend",
            description: "Write queries in frontend and API Assistant executes it for you"
        },
        {
            id: 2,
            title: "Welcome users at ease",
            description: "Integrate username-password authentication in minutes"
        },
        {
            id: 3,
            title: "Upload files",
            description: "Store user uploaded files without worrying about infrastructure"
        },
        {
            id: 4,
            title: "Clean and intutive UI",
            description: "Explore your data and files with simple and smooth UI"
        }
    ]

    public trackFeatureCard(_: number, card: LandingPageFeatureCard): number {
        return card.id;
    }

}