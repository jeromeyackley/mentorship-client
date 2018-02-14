import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import _ from 'lodash';
import {HomePage} from "../home/home";
import {UtilityProvider} from "../../providers/utility/utility";

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
  isSkills = true;
  interests = [];
  _interests = [];
  selectedInterests = [];
  pageTitle = 'Add Skills';


  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public util: UtilityProvider) {
    this.checkParams();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSkillsPage');
    this.getSkills();
    this.getInterests();
    this.initializeItems();
  }

  getSearchResults(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items

    if(this.isSkills){
      if (val && val.trim() != '') {
        this.skills = this._skills.filter((skill) => {
          return (skill.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }else{
      if (val && val.trim() != '') {
        this.interests = this._interests.filter((skill) => {
          return (skill.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }


  }

  initializeItems() {
    this.skills = this._skills;
    this.interests = this._interests;
  }

  getSkills(){
    this._skills = ['moon walking', 'bull riding', 'ice skating', 'electric triangle', 'cross country napping', 'doing the running man', 'making dumbass remarks'];
  }

  getInterests() {
    this._interests = ['moon walking2','bull riding2','ice skating2','electric triangle2','cross country napping2','doing the running man2','making dumbass remarks'];
  }


  updateSelected(item){
    let array = this.isSkills ? this.selectedSkills : this.selectedInterests;

    if (_.includes(array, item)){
      _.remove(array, function(s) {
        return s == item;
      });
    }else{
      array.push(item);
    }
    this.searchString = '';
    this.initializeItems();
    console.log('SELECTED ITEMS: ' + array);
  }

  selectedContainsItem(item){
    let array = this.isSkills ? this.selectedSkills : this.selectedInterests;

    return array.some((s)=>{
      return s === item;
    });
  }

  saveSkills(){
    this.util.showLoading(false, 'Saving your Skills');
    // updateing of the user
    setTimeout(()=>{
      this.isSkills = false;
      this.pageTitle = this.isSkills ? 'Add Skills' : 'Add Interests';
      this.util.stopLoading();
    }, 2000);

  }

  saveInterests(){
    // updateing of the user
    this.util.showLoading(false, 'Saving your Interests');
    // updateing of the user
    setTimeout(()=>{
      this.isSkills = false;
      this.util.stopLoading();
      this.navCtrl.push(HomePage);
    }, 2000);
  }

  checkParams(){
    this.isSkills = JSON.parse(this.navParams.get("isSkills"));
    this.pageTitle = this.isSkills ? 'Add Skills' : 'Add Interests';

    console.log('isSkills:' + this.isSkills)
  }
}
