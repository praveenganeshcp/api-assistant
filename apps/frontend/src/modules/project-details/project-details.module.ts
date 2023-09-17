import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { projectDetailsRoutes } from './project-details.routes';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';

@NgModule({
  imports: [RouterModule.forChild(projectDetailsRoutes)],
  declarations: [ProjectDetailsComponent],
})
export class ProjectDetailsModule {}
