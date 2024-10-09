import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EndpointDetailViewComponent } from './endpoint-detail-view.component';

describe('EndpointDetailViewComponent', () => {
  let component: EndpointDetailViewComponent;
  let fixture: ComponentFixture<EndpointDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndpointDetailViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EndpointDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
