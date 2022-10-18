import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Authentication } from '../models/authentication';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName = '';
  password = '';
  errorMessage = '';
  redirectURL = '/';
  subscriptions: Subscription[] = [];
  readonly REDIRECT_URL = 'redirectURL';

  constructor(private authService: AuthService,
    private router: Router) { }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

 ngOnInit(): void {
  }

 login(){
  const request= {
    "userName": this.userName,
    "password": this.password
  }
  this.authService.getTokenByUserName(request).subscribe(
    (data) => {
      if (data && data.jwt) {
        localStorage.setItem('userName', this.userName);
        localStorage.setItem('token', data.jwt);
        localStorage.setItem('role', data.role!);
        this.router.navigateByUrl('/dashboard');
      }else{
        this.errorMessage = 'Invalid data';
      }  
    });
  }

}
