import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwButtonComponent, SwDialogModule, SwDialogService, SwInputComponent, SwTableComponent } from 'ngx-simple-widgets';
import { Employee, EmployeesStore } from '../../employee.service';
import { AddOrEditEmployeeComponent } from '../add-or-edit-employee/add-or-edit-employee.component';

@Component({
  selector: 'api-assistant-demo-app',
  standalone: true,
  imports: [
    CommonModule,
    SwButtonComponent,
    SwInputComponent,
    SwTableComponent,
    SwDialogModule
  ],
  templateUrl: './demo-app.component.html',
  styleUrls: ['./demo-app.component.scss'],
})
export class DemoAppComponent {
  constructor(
    private store: EmployeesStore,
    private swModalService: SwDialogService
  ) {
  }

  ngOnInit() {
    this.store.loadEmployees()
  }

  openAddOrEditEmployee() {
    this.swModalService.open(AddOrEditEmployeeComponent, {
    })
  }

  openEditEmployeeModal(employee: Employee) {
    this.swModalService.open(AddOrEditEmployeeComponent, {
      data: employee
    })
  }

  employees$ = this.store.employees$;

  handleDelete(id: string) {
    this.store.deleteEmployee(id);
  }
}
