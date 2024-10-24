import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationCloudCodeHostComponent } from './application-cloud-code-host.component';

describe('ApplicationCloudCodeHostComponent', () => {
  let component: ApplicationCloudCodeHostComponent;
  let fixture: ComponentFixture<ApplicationCloudCodeHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationCloudCodeHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationCloudCodeHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
