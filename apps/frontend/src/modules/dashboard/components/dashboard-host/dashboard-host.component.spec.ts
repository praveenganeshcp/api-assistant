import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardHostComponent } from './dashboard-host.component';

describe('DashboardHostComponent', () => {
  let component: DashboardHostComponent;
  let fixture: ComponentFixture<DashboardHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
