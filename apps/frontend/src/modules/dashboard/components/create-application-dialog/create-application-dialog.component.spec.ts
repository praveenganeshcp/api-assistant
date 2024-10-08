import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateApplicationDialogComponent } from './create-application-dialog.component';

describe('CreateApplicationDialogComponent', () => {
  let component: CreateApplicationDialogComponent;
  let fixture: ComponentFixture<CreateApplicationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateApplicationDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateApplicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
