import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationAnalyticsHostComponent } from './application-analytics-host.component';

describe('ApplicationAnalyticsHostComponent', () => {
  let component: ApplicationAnalyticsHostComponent;
  let fixture: ComponentFixture<ApplicationAnalyticsHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationAnalyticsHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationAnalyticsHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
