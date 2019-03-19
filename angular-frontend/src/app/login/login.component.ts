import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginValidateService } from '../services/login-validate.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name : String;
  password : String;

  constructor(private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private loginValidate: LoginValidateService
  ) { }

  ngOnInit() {
  }
  onLoginSubmit(){
    const user = {
      name : this.name,
      password : this.password
    }
    //checking required fields
    if(!this.loginValidate.validateLogin(user)){
      this.flashMessage.show("Fill all fields.", {cssClass: 'alert-danger', timeout: 3000})
      return false
    }
    this.authService.authenticateUser(user).subscribe((data:any)=>{
      if(data.success){
        this.authService.storeUserData(data.token, data.user)
        this.flashMessage.show('You are now logged in.', {cssClass: 'alert-success',timeout: 3000,})
        this.router.navigate(['/dashboard'])

      }else{
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger',timeout: 3000,})
        this.router.navigate(['/login'])
      }
    })
  }

}
