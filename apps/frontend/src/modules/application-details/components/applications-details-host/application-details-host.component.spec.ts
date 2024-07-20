import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationDetailsHostComponent } from './application-details-host.component';

describe('ApplicationDetailsHostComponent', () => {
  let component: ApplicationDetailsHostComponent;
  let fixture: ComponentFixture<ApplicationDetailsHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationDetailsHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationDetailsHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
