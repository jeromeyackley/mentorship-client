import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TestimonialProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TestimonialProvider {

  constructor(public http: HttpClient) {
    console.log('Hello TestimonialProvider Provider');
  }

  addTestimonial(body) {
    return this.http.post('http://localhost:3000/testimonials', body, {headers: new HttpHeaders({"Content-Type":"application/json", "Authorization":this.session.token})})
  }

  getTestimonialsForUser(user_id) {
    return this.http.get('http://localhost:3000/testimonials/for_user/' + user_id, {headers: new HttpHeaders({"Content-Type":"application/json", "Authorization":this.session.token})})
  }
}
