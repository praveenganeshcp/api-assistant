import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  JsonEditorComponent,
  JsonEditorOptions,
  NgJsonEditorModule,
} from 'ang-jsoneditor';
import { CanBeNull } from 'ngx-simple-widgets';
import { BehaviorSubject, skip, takeUntil } from 'rxjs';

@Component({
  selector: 'commons-fe-json-input',
  standalone: true,
  imports: [CommonModule, NgJsonEditorModule, ReactiveFormsModule],
  templateUrl: './json-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => JsonInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class JsonInputComponent
  implements ControlValueAccessor, AfterViewInit, OnDestroy
{
  @Input() label: string = '';

  @ViewChild(JsonEditorComponent)
  jsonEditorComponent: CanBeNull<JsonEditorComponent> = null;

  public editorOptions = this.getEditorOptions();

  private onChange: CanBeNull<any> = null;

  private onTouched: CanBeNull<any> = null;

  public formControl = new FormControl();

  private destroy$ = new BehaviorSubject(null);

  ngAfterViewInit(): void {
    if (this.jsonEditorComponent) {
      (this.jsonEditorComponent as any).editor.aceEditor.renderer.setShowGutter(
        false
      );
    }
    this.formControl.valueChanges
      .pipe(takeUntil(this.destroy$.pipe(skip(1))))
      .subscribe((value: any) => {
        this.onChange(value);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  writeValue(value: any): void {
    this.formControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

  private getEditorOptions(): JsonEditorOptions {
    const editorOptions = new JsonEditorOptions();
    editorOptions.mode = 'code';
    editorOptions.indentation = 2;
    editorOptions.mainMenuBar = false;
    editorOptions.navigationBar = false;
    editorOptions.statusBar = false;
    (editorOptions as any).showErrorTable = false;
    return editorOptions;
  }
}
