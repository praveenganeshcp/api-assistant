import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditEndpointsHostComponent } from './edit-endpoints-host.component';

describe('EditEndpointsHostComponent', () => {
  let component: EditEndpointsHostComponent;
  let fixture: ComponentFixture<EditEndpointsHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEndpointsHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditEndpointsHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
