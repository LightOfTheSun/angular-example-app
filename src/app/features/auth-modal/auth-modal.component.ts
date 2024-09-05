import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ILoginModel } from './models/login.model';
import { IRegisterModel } from './models/register.model';
import { LoginComponent } from './ui/login/login.component';
import { SignupComponent } from './ui/signup/signup.component';
import { CoreService } from '../../shared/services/core.service';

@Component({
  selector: 'auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LoginComponent, SignupComponent],
  templateUrl: './auth-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthModalComponent {
  readonly modalService = inject(NgbActiveModal);
  isSignUp = signal(false);
  title = computed(() => this.isSignUp() ? 'Sign Up' : 'Log In');
  private readonly coreService = inject(CoreService);

  logIn(loginForm: ILoginModel) {
    // console.log(loginForm);
    this.coreService.isLoggedIn.set(true);
  }

  signUp(registerForm: IRegisterModel) {
    // console.log(registerForm);
    this.coreService.isLoggedIn.set(true);
  }

  switch() {
    this.isSignUp.update((isSignUp) => !isSignUp);
  }
}
