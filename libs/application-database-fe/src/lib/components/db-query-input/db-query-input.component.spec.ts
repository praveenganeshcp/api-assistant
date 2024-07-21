import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DbQueryInputComponent } from './db-query-input.component';

describe('DbQueryInputComponent', () => {
  let component: DbQueryInputComponent;
  let fixture: ComponentFixture<DbQueryInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DbQueryInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DbQueryInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
