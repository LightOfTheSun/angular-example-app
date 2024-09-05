import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TFormControl } from '../../../../shared/types/helper.types';
import { ILoginModel } from '../../models/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  login = output<ILoginModel>();

  readonly loginForm = new FormGroup<TFormControl<ILoginModel>>({
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.email, Validators.required] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    rememberMe: new FormControl<boolean>(false, { nonNullable: true })
  });

  submit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) this.login.emit(this.loginForm.getRawValue());
  }
}
