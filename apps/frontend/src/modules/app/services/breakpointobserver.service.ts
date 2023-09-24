import { LayoutModule, Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BreakPointObserver {

	constructor(
    	private breakpointObserver: BreakpointObserver
	) {}

	public isDesktopScreen$: Observable<boolean> = this.breakpointObserver.observe([
	      Breakpoints.Web
	    ]).pipe(
	      map(result=> result.matches)
	    );

  	public isTabletScreen$: Observable<boolean> = this.breakpointObserver.observe([
	      Breakpoints.Tablet
	    ]).pipe(
	      map(result=> result.matches)
	    );

	 public isMobileScreen$: Observable<boolean> = this.breakpointObserver.observe([
	      Breakpoints.Handset
	    ]).pipe(
	      map(result=> result.matches)
	    );

}