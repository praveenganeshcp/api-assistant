import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MigrationsListItemComponent } from './migrations-list-item.component';

describe('MigrationsListItemComponent', () => {
  let component: MigrationsListItemComponent;
  let fixture: ComponentFixture<MigrationsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MigrationsListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MigrationsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
