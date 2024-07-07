import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationFilesHostComponent } from './application-files-host.component';

describe('ApplicationFilesHostComponent', () => {
  let component: ApplicationFilesHostComponent;
  let fixture: ComponentFixture<ApplicationFilesHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationFilesHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationFilesHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
