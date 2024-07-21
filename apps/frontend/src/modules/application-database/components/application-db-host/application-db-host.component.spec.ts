import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationDbHostComponent } from './application-db-host.component';

describe('ApplicationDbHostComponent', () => {
  let component: ApplicationDbHostComponent;
  let fixture: ComponentFixture<ApplicationDbHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationDbHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationDbHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
