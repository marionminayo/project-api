import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginValidateService {

  constructor() { }
  validateLogin(user){
    if(user.name == undefined || user.password == undefined){
      return false;
    }else{
      return true;
    }
  }

}
