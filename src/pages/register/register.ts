import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {AddSkillsPage} from "../add-skills/add-skills";
import {HomePage} from "../home/home";
import {UtilityProvider} from "../../providers/utility/utility";
import {MentorPromptPage} from "../mentor-prompt/mentor-prompt";

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


  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider:UserProvider, public util:UtilityProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(creds:any){
    this.util.showLoading(false, 'Creating account...');
    this.userProvider.register(creds).subscribe((result)=>{
      if(result["success"] === true){
        this.userProvider.login(result["user"]).subscribe((res)=>{
          if(res["success"] === true){
            this.userProvider.startSession(res);
            this.util.stopLoading();
            if(!res["user"]["skills"].length){
              this.navCtrl.push(MentorPromptPage);
            }else{
              this.navCtrl.setRoot(HomePage);
            }
          }else{
            console.log(JSON.stringify(res));
            this.util.stopLoading();
          }
        });
      }else{
        console.log(JSON.stringify(result));
      }

    });
  }

  validateForm() {
    if ( this.firstName == "" || this.lastName == "" || this.email == "" || this.password == "" || this.passwordConf == "" ) {
      this.util.showToast('Missing required fields', 2);
    } else if ( this.password !== this.passwordConf ){
      this.util.showToast('Password mismatch', 2);
    } else if (this.invalidEmail(this.email) ){
      this.util.showToast('Invalid email', 2);
    } else if (this.invalidPassword(this.password) ){
      this.util.showToast('Password has to be at least 8 characters', 2);
    } else {
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

  invalidEmail(email) {;
    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !regex.test(email);
  }

  invalidPassword(password) {
    return password.length !== 8;
  }
}
