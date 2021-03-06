import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  addTestimonial(body, sessionToken) {
    return this.http.post('https://mentr.msts.com/api/testimonials', body, {headers: new HttpHeaders({"Content-Type":"application/json", "Authorization":sessionToken})})
  }

  getTestimonialsForUser(user_id, sessionToken) {
    return this.http.get('https://mentr.msts.com/api/testimonials/for_user/' + user_id, {headers: new HttpHeaders({"Content-Type":"application/json", "Authorization":sessionToken})})
  }
}
