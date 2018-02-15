import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {UserProvider} from "../../providers/user/user";
import {HomePage} from "../home/home";
import {AddSkillsPage} from "../add-skills/add-skills";
import {UtilityProvider} from "../../providers/utility/utility";
import {MentorPromptPage} from "../mentor-prompt/mentor-prompt";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider:UserProvider, public util:UtilityProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToRegister(){
    this.navCtrl.push(RegisterPage);
  }

  login(){
    this.util.showLoading(false, "Logging in...");
    this.userProvider.login(this.creds).subscribe((res)=>{
      if(res["success"] === true){
        this.userProvider.startSession(res);
        this.util.stopLoading();
        if(!res["user"]["skills"].length){
          this.navCtrl.push(MentorPromptPage);
        }else{
          this.navCtrl.setRoot(HomePage);
        }
      }else{
        this.util.showToast(res.message, 2);
        this.util.stopLoading();
      }
    });
  }

  validateForm() {
    if ( this.creds.email === "" || this.creds.password === "" ) {
      this.util.showToast('Missing required fields', 2);
    } else {
      this.login();
    }
  }

}
