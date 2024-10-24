import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CloudCodeFunctionsListComponent } from './cloud-code-functions-list.component';

describe('CloudCodeFunctionsListComponent', () => {
  let component: CloudCodeFunctionsListComponent;
  let fixture: ComponentFixture<CloudCodeFunctionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudCodeFunctionsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CloudCodeFunctionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
