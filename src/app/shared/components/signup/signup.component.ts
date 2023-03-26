import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/@core/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public SignupForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.SignupForm = this.fb.group({
      email: '',
      address: '',
      city: '',
      country: '',
      phone: '',
      name: '',
      password: ''
    })
  }

  submit(){
    this.authService.signup(this.SignupForm.value).pipe(
      tap((value)=> {
        this.authService.storeTokens(JSON.stringify(value))
        this.router.navigateByUrl("/vv")
      })
    ).subscribe()
  }

}
