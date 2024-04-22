import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddOrEditEmployeeComponent } from './add-or-edit-employee.component';

describe('AddOrEditEmployeeComponent', () => {
  let component: AddOrEditEmployeeComponent;
  let fixture: ComponentFixture<AddOrEditEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditEmployeeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddOrEditEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
