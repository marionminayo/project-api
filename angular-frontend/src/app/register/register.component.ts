import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService} from '../services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name : String;
  email : String;
  password : String;

  constructor(
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name : this.name,
      email : this.email,
      password : this.password
      
    }
    //checking required fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show("Fill all fields.", {cssClass: 'alert-danger', timeout: 3000})
      return false
    }

    //validating email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show("Put corret email format.", {cssClass: 'alert-danger', timeout: 3000})
      return false
    }

    //register user
    this.authService.registerUser(user).subscribe((data: any)=>{
      if(data.success){
        this.flashMessage.show("You are now registered.", {cssClass: 'alert-success', timeout: 3000})
        console.log(data)
        this.router.navigate(['/login'])
      }else{
        this.flashMessage.show("Something went wrong", {cssClass: 'alert-danger', timeout: 3000})
        this.router.navigate(['/register'])
      }
    })
  }
}
