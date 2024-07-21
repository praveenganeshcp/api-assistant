import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DbCollectionsViewComponent } from './db-collections-view.component';

describe('DbCollectionsViewComponent', () => {
  let component: DbCollectionsViewComponent;
  let fixture: ComponentFixture<DbCollectionsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DbCollectionsViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DbCollectionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
