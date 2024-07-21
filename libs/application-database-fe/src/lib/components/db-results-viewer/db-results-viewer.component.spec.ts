import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DbResultsViewerComponent } from './db-results-viewer.component';

describe('DbResultsViewerComponent', () => {
  let component: DbResultsViewerComponent;
  let fixture: ComponentFixture<DbResultsViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DbResultsViewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DbResultsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
