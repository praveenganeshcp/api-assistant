import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MigrationsHostContainerComponent } from './migrations-host-container.component';

describe('MigrationsHostContainerComponent', () => {
  let component: MigrationsHostContainerComponent;
  let fixture: ComponentFixture<MigrationsHostContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MigrationsHostContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MigrationsHostContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
