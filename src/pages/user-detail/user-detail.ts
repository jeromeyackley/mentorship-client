import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddSkillsPage} from "../add-skills/add-skills";
import {UserProvider} from "../../providers/user/user";
import {LoginPage} from "../login/login";
import {UtilityProvider} from "../../providers/utility/utility";

/**
 * Generated class for the UserDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage {
  user:any;
  canEdit = false;
  isEdit = false;
  editClass = '';
  dummySkills = [{name: 'Ruby'}, {name: 'JavaScript'}, {name: 'Ionic'}];
  dummyTestimonials = [{name: 'Jerome Yackley', text:'He was a great mentor! He even brewed coffee for me.'}, {name: 'Kevin Montanez', text:'He went above and beyond explaining shit for me'}];
  pageTitle = 'Profile';

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider:UserProvider, public util:UtilityProvider) {
    this.user = this.navParams.get("user");
    this.canEdit = this.navParams.get("canEdit");
    console.log("canEdit: " + this.canEdit);
    console.log("isEdit: " + this.isEdit);
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
    this.user = this.navParams.get("user");
  }

  formatSkills(array) {
    let temp = [];
    array.forEach((item)=>{
      temp.push(item.name)
    });
    return temp.join(', ')
  }

  formatTestimonials(array) {
    let temp = [];
    array.forEach((item)=>{
      temp.push(`${item.text} -- ${item.name}`)
    });
    return temp;
  }
  edit(){
    this.isEdit = true;
    this.editClass = '_editable';
    console.log("isEdit: " + this.isEdit);
  }

  save(){
    this.isEdit = false;
    this.editClass = '';
  }

  editSkills(){
    console.log('editting skills');
    this.navCtrl.push(AddSkillsPage, {isSkills:true, isEdit:true});

  }
  editInterests(){
    console.log('editting interests');
    this.navCtrl.push(AddSkillsPage, {isSkills:false, isEdit:true});

  }
  logout(){

    this.util.showLoading(false, "Logging out...");

    setTimeout(()=>{
      this.userProvider.logout().then((session)=>{
        if(session === null){
          this.util.stopLoading();
          this.navCtrl.setRoot(LoginPage);
        }else{
          console.log('could not log out.');
          this.util.stopLoading();
        }
      })
    }, 2000)

  }
}
