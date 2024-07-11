import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEndpointsHostComponent } from './create-endpoints-host.component';

describe('CreateEndpointsHostComponent', () => {
  let component: CreateEndpointsHostComponent;
  let fixture: ComponentFixture<CreateEndpointsHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEndpointsHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEndpointsHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
