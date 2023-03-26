import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../../schema/account';
import { SignupType } from '../../schema/SignupType';
import { MainService } from '../main.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private service : MainService) { }
  getAccessToken() {
    return localStorage.getItem('access-token');
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    // Check whether the refresh token is expired and return
    // true or false
    return token ? true: false;
  }

  getRefreshToken() {
    return localStorage.getItem('refresh-token');
  }

  storeTokens(access: string) {
    localStorage.setItem('access-token', access);
  }

  clearTokens() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
  }
  login (body:Account):Observable<any>{
    console.log(body)
    return this.service._POST('/api/auth/signin',body);
  }
  signup(body: SignupType): Observable<any> {
    console.log(body)
    return this.service._POST('/api/auth/signup', body);
  }
}
