import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMigrationModalComponent } from './create-migration-modal.component';

describe('CreateMigrationModalComponent', () => {
  let component: CreateMigrationModalComponent;
  let fixture: ComponentFixture<CreateMigrationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMigrationModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMigrationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
