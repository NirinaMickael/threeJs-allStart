import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public AccountForm : FormGroup;
  constructor(private authService : AuthService , private router : Router) { 
    this.AccountForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.pattern( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
      password: new FormControl('', [Validators.required,Validators.minLength(6)]),
      // name : new FormControl('', [Validators.required,Validators.minLength(2)])
    });
  }

  ngOnInit(): void {
  }
  onSubmit(event:Event){
    event.preventDefault();
    if(this.AccountForm.invalid){
      return ;
    }
    let payload = {
      ...this.AccountForm.value,
    };
    // this.router.navigate(["/vv"])
    this.authService.login(payload).subscribe((resp)=>{
      this.authService.storeTokens(JSON.stringify(resp))
      this.router.navigate(["/vv"])
    });
  }
}
