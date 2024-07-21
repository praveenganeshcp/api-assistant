import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DbResultsRawJsonViewComponent } from './db-results-raw-json-view.component';

describe('DbResultsRawJsonViewComponent', () => {
  let component: DbResultsRawJsonViewComponent;
  let fixture: ComponentFixture<DbResultsRawJsonViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DbResultsRawJsonViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DbResultsRawJsonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
