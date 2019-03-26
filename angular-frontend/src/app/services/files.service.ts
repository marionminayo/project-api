import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class FilesService {

  file: any;
  constructor(private authService: AuthService, private http : HttpClient) { }


  // loadToken(){
  //   const token = localStorage.getItem('id_token')
  //   this.authService.authToken = token;
  // }

  newFile(data){
    this.authService.loadToken()
    
    const httpOptions = {
      headers: new HttpHeaders({
        
        'Authorization': this.authService.authToken
      })}
    return this.http.post('http://localhost:3000/files/newFile',data, httpOptions)
  }


}
