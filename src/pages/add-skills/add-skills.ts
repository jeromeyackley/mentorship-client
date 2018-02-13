import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the AddSkillsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-skills',
  templateUrl: 'add-skills.html',
})
export class AddSkillsPage {
  searchString = '';
  skills = ['moon walking', 'bull riding', 'ice skating', 'electric triangle'];
  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSkillsPage');
  }

}
