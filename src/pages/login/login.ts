import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  creds = {
    email:'',
    password:''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider:UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToRegister(){
    this.navCtrl.push(RegisterPage);
  }

  login(){
    console.log("loggin in with" + JSON.stringify(this.creds));
    this.userProvider.login(this.creds).subscribe((user)=>{
      this.userProvider.startSession(user);
    }, (err)=>{
      console.log(err);
    });
  }

}
