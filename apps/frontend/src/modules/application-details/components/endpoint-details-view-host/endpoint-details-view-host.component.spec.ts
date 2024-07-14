import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EndpointDetailsViewHostComponent } from './endpoint-details-view-host.component';

describe('EndpointDetailsViewHostComponent', () => {
  let component: EndpointDetailsViewHostComponent;
  let fixture: ComponentFixture<EndpointDetailsViewHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndpointDetailsViewHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EndpointDetailsViewHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
