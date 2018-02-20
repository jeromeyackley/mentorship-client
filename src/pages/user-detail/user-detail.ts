import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddSkillsPage} from "../add-skills/add-skills";
import {UserProvider} from "../../providers/user/user";
import {LoginPage} from "../login/login";
import {UtilityProvider} from "../../providers/utility/utility";
import {TestimonialProvider} from "../..providers/testimonial/testimonial"

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
  pageTitle = 'Profile';
  newTestimonial = '';
  testimonials = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider:UserProvider, public util:UtilityProvider, public testimonialProvider: TestimonialProvider) {
    this.user = this.navParams.get("user");
    this.canEdit = this.navParams.get("canEdit");
    this.getTestimonials();
    console.log("canEdit: " + this.canEdit);
    console.log("isEdit: " + this.isEdit);
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
    this.user = this.navParams.get("user")._id === this.userProvider.getUser()._id ? this.userProvider.getUser() : this.navParams.get("user");
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
    }, 2000);
  }

  addTestimonial(){
    this.util.showLoading(false, 'Adding testimonial...');
    let body = {
      receiver_id: this.user._id,
      from: `${this.userProvider.session.user.first_name} ${this.userProvider.session.user.last_name}`,
      text: this.newTestimonial
    }
    this.testimonialProvider.addTestimonial(JSON.stringify(body)).subscribe((result)=>{
      if(result["success"] === true){
        this.testimonials.push(body);
        this.util.stopLoading();
      }else{
        console.log(JSON.stringify(result));
      }
    });
  }

  getTestimonials() {
    this.testimonialProvider.getTestimonialsForUser(this.user._id).subscribe((result)=>{
      if(result["success"] === true){
        this.testimonials = result["testimonials"];
      } else{
        console.log(JSON.stringify(result));
      }
    });
  }
}
