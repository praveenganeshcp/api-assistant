import { Component, forwardRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { CanBeNull } from 'ngx-simple-widgets';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@Component({
  selector: 'api-assistant-migration-logic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MonacoEditorModule],
  templateUrl: './migration-logic-form.component.html',
  styleUrls: ['./migration-logic-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MigrationLogicFormComponent),
      multi: true,
    },
  ],
})
export class MigrationLogicFormComponent
  implements ControlValueAccessor, OnInit
{
  editorOptions = { theme: 'vs-dark', language: 'javascript', fontSize: 16 };

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
