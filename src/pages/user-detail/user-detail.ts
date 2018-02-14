import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  canEdit:false;
  isEdit:false;
  dummySkills = [{name: 'Ruby'}, {name: 'JavaScript'}, {name: 'Ionic'}]
  dummyTestimonials = [{name: 'Jerome Yackley', text:'He was a great mentor! He even brewed coffee for me.'}, {name: 'Kevin Montanez', text:'He went above and beyond explaining shit for me'}];
  pageTitle = 'Profile';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get("user");
    this.canEdit = this.navParams.get("canEdit");
    console.log("canEdit: " + this.canEdit);
  }

  ionViewDidLoad() {
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
}
