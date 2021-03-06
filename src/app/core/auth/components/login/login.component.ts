import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Data } from '../../interfaces/interfaces';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  onDestroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private tokenService: TokenService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  login() {
    this.authService.login(this.form.value)
    .pipe(
      takeUntil(this.onDestroy$)
    )
    .subscribe((data: Data) => {
      if ( data.user.roles[0] ===  'ADMIN' ) {
        this.tokenService.saveToken(data.access_token);
        this.router.navigate(['/admin']);
      } else {
        this.tokenService.setAuthenticate(data.user.id!);
        this.router.navigate(['/order']);
      }
    });
  }

  get emailNoValido() {
    return (
      this.form.get('email')?.errors?.['required'] &&
      this.form.get('email')?.touched
    );
  }

  get emailInvalid() {
    return (
      this.form.get('email')?.errors?.['email'] &&
      this.form.get('email')?.touched
    );
  }

  get passwordNoValido() {
    return (
      this.form.get('password')?.errors?.['required'] &&
      this.form.get('password')?.touched
    );
  }
}
