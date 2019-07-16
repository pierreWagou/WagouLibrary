import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {FormGroup, FormBuilder, Validators} from '@angular/forms'

import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup
  errorMessage: string

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.signinForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })
  }

  onSubmit() {
    const email = this.signinForm.get("email").value
    const password = this.signinForm.get("password").value
    this.authService.signInUser(email,password).then(
      () => {this.router.navigate(["/books"])},
      (error) => {this.errorMessage = error}
    )
  }
}
