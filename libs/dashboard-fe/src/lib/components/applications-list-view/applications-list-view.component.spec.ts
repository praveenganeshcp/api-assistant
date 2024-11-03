import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationsGridViewComponent } from './applications-list-view.component';

describe('ApplicationsGridViewComponent', () => {
  let component: ApplicationsGridViewComponent;
  let fixture: ComponentFixture<ApplicationsGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationsGridViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationsGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
