import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  formGroup: FormGroup;

  isLogin: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private matToast: MatSnackBar
  ) {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  ngOnInit(): void {}

  private displaySnack() {
    this.matToast.open('Login fehlgeschlagen', '', {
      duration: 3000,
    });
  }

  login() {
    const email = this.formGroup.get('email').value;
    const password = this.formGroup.get('password').value;
    if (this.isLogin) {
      this.auth
        .login(email, password)
        .then((success) => {
          if (success) {
            this.router.navigateByUrl(this.auth.redirectUrl);
          } else {
            this.displaySnack();
          }
        })
        .catch((err) => {
          console.error(err);
          this.displaySnack();
        });
    } else {
      this.auth
        .signup(email, password)
        .then((success) => {
          if (success) {
            this.router.navigateByUrl(this.auth.redirectUrl);
          } else {
            this.displaySnack();
          }
        })
        .catch((err) => {
          console.error(err);
          this.displaySnack();
        });
    }
  }
}
