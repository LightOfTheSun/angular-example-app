import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TFormControl } from '../../../../shared/types/helper.types';
import { IRegisterModel } from '../../models/register.model';
import { passwordValidator, phoneNumberValidator } from '../../../../shared/utils/validators.utils';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent {
  signup = output<IRegisterModel>();

  signupForm = new FormGroup<TFormControl<IRegisterModel>>({
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.email, Validators.required] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, passwordValidator] }),
    passwordConfirm: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    firstName: new FormControl<string | null>(null),
    lastName: new FormControl<string | null>(null),
    phone: new FormControl<string | null>(null, { nonNullable: true, validators: [phoneNumberValidator] }),
    acceptTerms: new FormControl<boolean>(false, { nonNullable: true, validators: [Validators.requiredTrue] })
  }, {
    validators: (form) => {
      const { password, passwordConfirm } = form.value as IRegisterModel;
      if (password !== passwordConfirm) return { passwordMatch: true };
      return null;
    }
  });

  submit() {
    this.signupForm.markAllAsTouched();
    if (this.signupForm.valid) this.signup.emit(this.signupForm.getRawValue());
  }

}
