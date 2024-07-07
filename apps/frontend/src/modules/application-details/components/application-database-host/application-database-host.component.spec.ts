import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationDatabaseHostComponent } from './application-database-host.component';

describe('ApplicationDatabaseHostComponent', () => {
  let component: ApplicationDatabaseHostComponent;
  let fixture: ComponentFixture<ApplicationDatabaseHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationDatabaseHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationDatabaseHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
