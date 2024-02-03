import { AbstractControl } from '@angular/forms';

/**
 * Validates if password in the form control satisfies strong password criteria
 * @param formControl Password form control
 * @returns Validation errors incase password is not strong or null if valid.
 */
export const strongPasswordValidator = (formControl: AbstractControl) => {
  // Get password input value
  const password: string = formControl.value;

  // Assert if min 8 chars are present
  const isMin8Chars: boolean = password.length > 8;
  let hasOneUpperCase = false;
  let hasOneLowerCase = false;
  let hasOneNumber = false;

  // Iterate each char and check if atlease one number, one uppercase and one lowercase is present;
  password.split('').forEach((passwordChar: string) => {
    const codePoint = passwordChar.charCodeAt(0);
    if (codePoint >= 65 && codePoint <= 90) {
      hasOneUpperCase = true;
    } else if (codePoint >= 97 && codePoint <= 122) {
      hasOneLowerCase = true;
    } else if (codePoint >= 48 && codePoint <= 57) {
      hasOneNumber = true;
    }
  });
  return isMin8Chars && hasOneUpperCase && hasOneLowerCase && hasOneNumber
    ? null
    : { strongPassword: true };
};
