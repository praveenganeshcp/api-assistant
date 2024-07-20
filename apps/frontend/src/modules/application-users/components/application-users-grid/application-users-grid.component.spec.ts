import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationUsersGridComponent } from './application-users-grid.component';

describe('ApplicationUsersGridComponent', () => {
  let component: ApplicationUsersGridComponent;
  let fixture: ComponentFixture<ApplicationUsersGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationUsersGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationUsersGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
