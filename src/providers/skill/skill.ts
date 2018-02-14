import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SkillProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SkillProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SkillProvider Provider');
  }

  addItem(item){
      return this.http.post('http://10.119.117.51:3000/skills/add', item, {headers: new HttpHeaders({"Content-Type":"application/json"})})
    }

  getAll(){
    return this.http.get('http://10.119.117.51:3000/skills')

  }
}
