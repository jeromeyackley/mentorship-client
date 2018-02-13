import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import _ from 'lodash';

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
  skills = [];
  _skills = [];
  selectedSkills = [];
  searchString = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSkillsPage');
    this.getSkills();
    this.initializeItems();
  }

  getSearchResults(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.skills = this._skills.filter((skill) => {
        return (skill.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  initializeItems() {
    this.skills = this._skills;
  }

  getSkills(){
    this._skills = ['moon walking', 'bull riding', 'ice skating', 'electric triangle', 'cross country napping', 'doing the running man', 'making dumbass remarks'];
  }

  updateSelected(skill){
    if (_.includes(this.selectedSkills, skill)){
      _.remove(this.selectedSkills, function(s) {
        return s == skill;
      });
    }else{
      this.selectedSkills.push(skill);
    }
    this.searchString = '';
    this.initializeItems();
    console.log('SELECTED SKILLS: ' + this.selectedSkills);
  }

  selectedContainsItem(skill){
  // return _.includes(this.selectedSkills, skill);
    return this.selectedSkills.some((s)=>{
      return s === skill;
    });
  }


  saveSkills(){
    // updateing of the user
  }

}
