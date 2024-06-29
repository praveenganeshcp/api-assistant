import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EndpointsListViewComponent } from './endpoints-list-view.component';

describe('EndpointsListViewComponent', () => {
  let component: EndpointsListViewComponent;
  let fixture: ComponentFixture<EndpointsListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndpointsListViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EndpointsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
