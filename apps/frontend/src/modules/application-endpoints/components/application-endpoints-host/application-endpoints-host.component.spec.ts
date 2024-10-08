import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationEndpointsHostComponent } from './application-endpoints-host.component';

describe('ApplicationEndpointsHostComponent', () => {
  let component: ApplicationEndpointsHostComponent;
  let fixture: ComponentFixture<ApplicationEndpointsHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationEndpointsHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationEndpointsHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
