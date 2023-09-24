import { Component, Inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { 
  SW_DIALOG_DATA, 
  SwDialogRef, 
  SwDialogModule,
  SwButtonComponent,
  SwInputComponent,
  SwAllowedSizes
} from "ngx-simple-widgets";
 import { Observable, map, combineLatest } from "rxjs";
 import { BreakPointObserver } from "../../../app/services/breakpointobserver.service";

@Component({
  selector: 'api-assistant-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SwDialogModule,
    SwButtonComponent,
    SwInputComponent,
  ]
})
export class CreateProjectComponent {
  constructor(
    @Inject(SW_DIALOG_DATA) public data: any,
    private dialogRef: SwDialogRef<any>,
    private breakpointObserver: BreakPointObserver
  ) {}

  public dialogSize$: Observable<SwAllowedSizes> = combineLatest([
    this.breakpointObserver.isDesktopScreen$, 
    this.breakpointObserver.isTabletScreen$, 
    this.breakpointObserver.isMobileScreen$
  ]).pipe(
    map(([isDesktopScreen, isTabletScreen, isMobileScreen]) => {
      if(isDesktopScreen) return "sm";
      else if(isTabletScreen) return "sm";
      return "lg";
    })
  )
}
