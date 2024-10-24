import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanBeNull } from 'ngx-simple-widgets';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@Component({
  selector: 'api-assistant-cloud-code-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MonacoEditorModule],
  templateUrl: './cloud-code-editor.component.html',
  styleUrls: ['./cloud-code-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CloudCodeEditorComponent),
      multi: true,
    },
  ]
})
export class CloudCodeEditorComponent {
  editorOptions = { language: 'javascript', fontSize: 16 };

  private onChange: CanBeNull<Function> = null;

  public formControl = new FormControl('');

  writeValue(value: any): void {
    this.formControl.setValue(value);
  }

  ngOnInit(): void {
    this.formControl.valueChanges.subscribe((value) => {
      if (this.onChange) {
        this.onChange(value);
      }
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
