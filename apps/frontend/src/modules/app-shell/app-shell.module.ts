import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appShellRoutes } from './app-shell-routing.module';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { CommonModule } from '@angular/common';
import { SwIconComponent } from "ngx-simple-widgets";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appShellRoutes),
    SwIconComponent
  ],
  declarations: [AppHeaderComponent],
})
export class AppShellModule {}
