import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      loginEmail: new FormControl('', {validators: [Validators.required, Validators.email]}),
      loginPassword: new FormControl('', {validators: [Validators.required]})
    });
  }

  onSubmit() {
    console.log(this.loginForm);
    this.authService.login({
      email: this.loginForm.value.loginEmail,
      password: this.loginForm.value.loginPassword
    });

  }

}
