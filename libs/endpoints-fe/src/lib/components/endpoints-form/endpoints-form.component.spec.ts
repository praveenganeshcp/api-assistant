import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EndpointsFormComponent } from './endpoints-form.component';

describe('EndpointsFormComponent', () => {
  let component: EndpointsFormComponent;
  let fixture: ComponentFixture<EndpointsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndpointsFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EndpointsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
