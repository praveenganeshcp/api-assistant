import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectDetailsHostComponent } from './project-details-host.component';

describe('ProjectDetailsHostComponent', () => {
  let component: ProjectDetailsHostComponent;
  let fixture: ComponentFixture<ProjectDetailsHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailsHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetailsHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
