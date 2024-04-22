import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanBeNull, SW_DIALOG_DATA, SwDialogModule, SwDialogRef } from 'ngx-simple-widgets';
import { EmployeePayload, EmployeesStore } from '../../employee.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'api-assistant-add-or-edit-employee',
  standalone: true,
  imports: [
    CommonModule,
    SwDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-or-edit-employee.component.html',
  styleUrls: ['./add-or-edit-employee.component.scss'],
})
export class AddOrEditEmployeeComponent {

  public employeeForm: FormGroup

  constructor(
    @Inject(SW_DIALOG_DATA)
    private dialogData: CanBeNull<EmployeePayload>,
    private formBuilder: FormBuilder,
    private store: EmployeesStore,
    private dialogRef: SwDialogRef<any>
  ) {
    console.log(dialogData)
    this.employeeForm = this.formBuilder.group({
      name: this.formBuilder.control(dialogData?.name ?? ""),
      city: this.formBuilder.control(dialogData?.city ?? ""),
      department: this.formBuilder.control(dialogData?.department ?? "")
    })
  }

  handleSaveEmployee() {
    const { name, city, department } = this.employeeForm.value;
    if(!this.dialogData) {
      this.store.addEmployee({
        name, city, department
      })  
    }
    else {
      this.store.editEmployee({
        name, city, department, _id: this.dialogData._id
      })
    }
    this.dialogRef.close(null)
  }
}
