import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  session:any;
  constructor(public http: HttpClient) {
  }

  login(body){
   return this.http.post('https://mentr.msts.com/api/users/auth', body, {headers: new HttpHeaders({"Content-Type":"application/json"})})
  }
  startSession(session){
    this.session = session;
    console.log("Starting session with " + JSON.stringify(this.session));
  }
  register(body){
    return this.http.post('https://mentr.msts.com/api/users/register', body, {headers: new HttpHeaders({"Content-Type":"application/json"})})
  }

  logout(){
    this.session = null;
    return Promise.resolve(this.session);
  }

  getUser(){
    return this.session.user;
  }

  getUsersBySkill(id) {
    return this.http.get('https://mentr.msts.com/api/users/skill/' + id, {headers: new HttpHeaders({"Content-Type": "application/json"})})
  }

  getAllUsers(){
    return this.http.get('https://mentr.msts.com/api/users/' + this.session.user._id, {headers: new HttpHeaders({"Content-Type": "application/json"})})
  }
  updateUser(body){
    return this.http.put('https://mentr.msts.com/api/users/' + this.session.user._id, body, {headers: new HttpHeaders({"Content-Type":"application/json", "Authorization":this.session.token})})
  }

}
