import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {UserProvider} from "../../providers/user/user";
import {HomePage} from "../home/home";
import {AddSkillsPage} from "../add-skills/add-skills";

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
    this.userProvider.login(this.creds).subscribe((res)=>{
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
  }

}
