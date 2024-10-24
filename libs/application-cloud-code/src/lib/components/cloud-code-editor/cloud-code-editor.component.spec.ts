import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CloudCodeEditorComponent } from './cloud-code-editor.component';

describe('CloudCodeEditorComponent', () => {
  let component: CloudCodeEditorComponent;
  let fixture: ComponentFixture<CloudCodeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudCodeEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CloudCodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
