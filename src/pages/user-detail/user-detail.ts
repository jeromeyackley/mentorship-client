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
  displayTest = [];
  dummySkills = [{name: 'Ruby'}, {name: 'JavaScript'}, {name: 'Ionic'}];
  dummyTestimonials = [{name: 'Eric Biven', text:'He was a great mentor! He even brewed coffee for me.'},
    {name: 'Kevin Montanez', text:'He went above and beyond explaining Angular components to me.'},
    {name: 'Jerome Yackley', text: 'Kevin Montanez has mad skills in web designing. If you have a desire to create a web site, I highly recommend you seek Kevin out as your mentor.' },
    {name:'Arona Ash', text: 'Chad is a great mentor and he helped me learn Ruby skills very quickly.'     },
    {name: 'Jyoti Mittal', text: 'Alisher has been an exceptional mentor to me. His willingness to share the Back-end development and NodeJS experiences has been invaluable.' },
    {name: 'Alisher Sadikov', text: 'As a new employee, I can say without a doubt that I think all new employees should participate in the mentorship program! My mentor introduced me to so many new people and helped me navigate my way through a lot of situations, acquainting me with the MSTS norms!'}];
  pageTitle = 'Profile';

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider:UserProvider, public util:UtilityProvider) {
    this.user = this.navParams.get("user");
    this.canEdit = this.navParams.get("canEdit");
    this.randomizeTest(this.dummyTestimonials);
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

  // formatTestimonials() {
  //   this.displayTest = this.randomizeTest(this.dummyTestimonials);
  // }


  randomizeTest(arr){
    let test = [];
    test.push(arr[Math.floor(Math.random() * Math.floor(arr.length))]);
    test.push(arr[Math.floor(Math.random() * Math.floor(arr.length - 1))]);
    this.displayTest =  test;

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
