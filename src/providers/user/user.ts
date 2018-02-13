import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  user:undefined;

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  login(body){
   return this.http.post('http://localhost:3000/users/auth', body, {headers: new HttpHeaders({"Content-Type":"application/json"})})
  }
  startSession(user){
    this.user = user;
    console.log(this.user);
  }

}
