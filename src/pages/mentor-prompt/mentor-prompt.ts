import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddSkillsPage} from "../add-skills/add-skills";
import {HomePage} from "../home/home";

/**
 * Generated class for the MentorPromptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mentor-prompt',
  templateUrl: 'mentor-prompt.html',
})
export class MentorPromptPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MentorPromptPage');
  }

  stayActive(active:boolean){
    // update user.active

    // go to next view
    if(active){
      this.navCtrl.push(AddSkillsPage, {isSkills:true});
    }else{
      this.navCtrl.push(AddSkillsPage, {isSkills:false});
    }
  }

}
