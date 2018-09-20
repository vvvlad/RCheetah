import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  user: User;

  constructor(private authService: AuthService, private router: Router, private snack: MatSnackBar) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
        email: new FormControl('', {validators: [Validators.required, Validators.email]}),
        userName: new FormControl('', {validators: [Validators.required]}),
        password: new FormControl('', {validators: [Validators.required, Validators.minLength(6), Validators.maxLength(10)]}),
        confirmPassword: new FormControl('', {validators: [Validators.required]}),
        agreeToTerms: new FormControl(false, {validators: [Validators.required]})
    }, this.passwordMatchValidator);
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }
  getPasswordErrorMessage() {
    return this.registerForm.get('password').hasError('required') ? 'Password is required' :
    this.registerForm.get('password').hasError('minlength') ? 'Password is too short' :
        '';
  }

  getConfirmPasswordErrorMessage() {
    return  this.registerForm.hasError('mismatch') ? 'Passwords do not match' : '';
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
    }

    this.authService.register(this.user);


    // this.authService.register({
    //   email: this.registerForm.get('email').value,
    //   userName: this.registerForm.get('userName').value,
    //   password: this.registerForm.get('password').value,
    // });
  }

}
