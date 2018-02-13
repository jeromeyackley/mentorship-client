import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  session:undefined;
  constructor(public http: HttpClient) {
  }

  login(body){
   return this.http.post('http://localhost:3000/users/auth', body, {headers: new HttpHeaders({"Content-Type":"application/json"})})
  }
  startSession(user){
    this.session = user;
    console.log("Starting session with " + JSON.stringify(this.session));
  }
  register(body){
    return this.http.post('http://localhost:3000/users/register', body, {headers: new HttpHeaders({"Content-Type":"application/json"})})
  }
}
