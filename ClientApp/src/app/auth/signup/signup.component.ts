import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxBirthDate;

  constructor(private authService: AuthService ) { }

  ngOnInit() {
    this.maxBirthDate = new Date();
    this.maxBirthDate.setFullYear(this.maxBirthDate.getFullYear() - 18);

  }

  onSubmit(form: NgForm) {
    this.authService.register({email: form.value.email, password: form.value.password});
    // console.log(form);
  }

}
