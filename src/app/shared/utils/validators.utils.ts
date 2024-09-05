import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export const phoneNumberValidator: ValidatorFn = Validators.pattern(/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/);

export const passwordValidator: ValidatorFn = (control: AbstractControl) => {
  const password = control.value as string;
  if (password) {
    const errors: Record<string, boolean> = {};

    if (password.length < 8 || password.length > 20) errors['passwordLength'] = true;
    if (password.match(/\d/) === null) errors['passwordDigit'] = true;
    if (password.match(/[A-z]/) === null) errors['passwordLetter'] = true;

    return errors || null;
  }
  return null;
};
