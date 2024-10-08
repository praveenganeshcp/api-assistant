import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MigrationLogicFormComponent } from './migration-logic-form.component';

describe('MigrationLogicFormComponent', () => {
  let component: MigrationLogicFormComponent;
  let fixture: ComponentFixture<MigrationLogicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MigrationLogicFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MigrationLogicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
