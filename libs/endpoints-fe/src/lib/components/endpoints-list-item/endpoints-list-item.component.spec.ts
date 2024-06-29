import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EndpointsListItemComponent } from './endpoints-list-item.component';

describe('EndpointsListItemComponent', () => {
  let component: EndpointsListItemComponent;
  let fixture: ComponentFixture<EndpointsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndpointsListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EndpointsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
