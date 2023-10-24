import { AbstractControl } from '@angular/forms';

export const strongPasswordValidator = (formControl: AbstractControl) => {
  const password: string = formControl.value;
  const isMin8Chars: boolean = password.length > 8;
  let hasOneUpperCase = false;
  let hasOneLowerCase = false;
  let hasOneNumber = false;
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
