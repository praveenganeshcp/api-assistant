import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from './dashboard.routes';
import { StoreModule } from '@ngrx/store';
import { dashboardReducers } from './store/dashboard.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProjectsEffects } from './store/dashboard.effects';
import { 
  SwButtonComponent,
  SwDialogModule
} from 'ngx-simple-widgets';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [DashboardComponent, CreateProjectComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    StoreModule.forFeature('dashboard', dashboardReducers),
    EffectsModule.forFeature([ProjectsEffects]),
    SwButtonComponent,
    SwDialogModule,
    MatIconModule
  ],
})
export class DashboardModule {}
