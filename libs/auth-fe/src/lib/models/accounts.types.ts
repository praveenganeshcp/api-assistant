import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

/**
 * User profile domain model
 */
export interface UserProfile {
  username: string;
  emailId: string;
  lastLoggedInOn: string;
  isActive: boolean;
  isVerified: boolean;
  createdOn: string;
}

export interface LoginFormData {
  emailId: string;
  password: string;
}

export interface SignupFormData extends LoginFormData {
  username: string;
}

export abstract class UniqueEmailIdValidator {
  abstract validate(control: AbstractControl): Observable<null | ValidationErrors>;
}