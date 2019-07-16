import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {FormGroup, FormBuilder, Validators} from '@angular/forms'

import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup
  errorMessage: string

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })
  }

  onSubmit() {
    const email = this.signupForm.get("email").value
    const password = this.signupForm.get("password").value
    this.authService.createNewUser(email,password).then(
      () => {this.router.navigate(["/books"])},
      (error) => {this.errorMessage = error}
    )
  }
}
