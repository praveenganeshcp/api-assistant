import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { landingPageRoutes } from "./landing-page-routing.module";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [LandingPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(landingPageRoutes)
    ]
})
export class LandingPageModule {}