import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {AddSkillsPage} from "../add-skills/add-skills";
import {HomePage} from "../home/home";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

    firstName: '';
    lastName: '';
    email: '';
    password:'';
    passwordConf:'';
    phone: '';


  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider:UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(creds:any){
    this.userProvider.register(creds).subscribe((result)=>{
      if(result["success"] === true){
        this.userProvider.login(result["user"]).subscribe((res)=>{
          if(res["success"] === true){
            this.userProvider.startSession(res);
            if(!res["user"]["skills"].length){
              this.navCtrl.push(AddSkillsPage);
            }else{
              this.navCtrl.push(HomePage);
            }
          }else{
            console.log(JSON.stringify(res));
          }
        });
      }else{
        console.log(JSON.stringify(result));
      }

    });
  }

  validateForm() {
    if (this.password !== this.passwordConf) {
      window.alert('Passwords did not match');
    }
    let creds = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      phone: this.phone
    };
    this.register(creds);
  }

}
