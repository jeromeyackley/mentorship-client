import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import _ from 'lodash';
import {HomePage} from "../home/home";
import {UtilityProvider} from "../../providers/utility/utility";
import {SkillProvider} from "../../providers/skill/skill";

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
  isEdit = false;
  placeholder = 'What skills can you mentor?';
  buttonDisabled = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public util: UtilityProvider, public skillProvider:SkillProvider) {
    this.checkParams();
    console.log('ionViewDidLoad AddSkillsPage');
    this.getAllSkills();
    this.getAllInterests();
    this.initializeItems();
  }

  ionViewDidLoad() {

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
          return (skill.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }else{
      if (val && val.trim() != '') {
        this.interests = this._interests.filter((interest) => {
          return (interest.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }
  }

  initializeItems() {
    this.skills = this._skills;
    this.interests = this._interests;
  }

  getAllSkills(){
    this.skillProvider.getAll().subscribe((res)=>{
      this._skills = res["skills"];
      this.initializeItems();
    });
  }

  getAllInterests() {
    this.skillProvider.getAll().subscribe((res)=>{
      //skills is the model name:this is correct.
      this._interests = res["skills"];
      this.initializeItems();
    });
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
    this.buttonDisabled = !array.length;
    console.log('SELECTED ITEMS: ' + array);
    console.log('button_disabled: ' + this.buttonDisabled);
  }

  selectedContainsItem(item){
    let array = this.isSkills ? this.selectedSkills : this.selectedInterests;
    return array.some((s)=>{
      return s === item;
    });
  }

  saveSkills(){
    this.util.showLoading(false, 'Saving your Skills');

    setTimeout(()=>{
      // SAVE SKILL TO USER
      var itemsProcessed = 0;
      let user = this.userProvider.getUser();
      user.skills = [];

      /// SHOULD CHECK IF PRESENT BEFORE ADDING
      this.selectedSkills.forEach((skill, index, array)=>{
        user.skills.push(skill);
        itemsProcessed++;
        if(itemsProcessed === array.length){
          this.userProvider.updateUser(user).subscribe((res)=>{
            console.log('res from update' + JSON.stringify(res["user"]));
            this.userProvider.session.user = res["user"];
            console.log('saving session.user:' + JSON.stringify(res["user"]));

            //UPDATE MODE & EDIT
            if(this.isEdit){
              this.isSkills = false;
              this.pageTitle = this.isSkills ? 'Add Skills' : 'Add Interests';
              this.util.stopLoading();
              this.navCtrl.pop();
            }else{
              this.isSkills = false;
              this.pageTitle = this.isSkills ? 'Add Skills' : 'Add Interests';
              this.util.stopLoading();
            }
          });
        }
      });
    }, 2000);
  }

  saveInterests(){
    // updateing of the user
    this.util.showLoading(false, 'Saving your Interests');
    // updateing of the user
    setTimeout(()=>{
      //SAVE SKILL TO USER
      var itemsProcessed = 0;
      let user = this.userProvider.getUser();
      user.aoi = [];
      this.selectedInterests.forEach((interest, index, array)=>{
        user.aoi.push(interest);
        itemsProcessed++;
        if(itemsProcessed === array.length){
          this.userProvider.updateUser(user).subscribe((res)=>{
            console.log('res from update' + JSON.stringify(res["user"]));
            this.userProvider.session.user = res["user"];
            console.log('saving session.user:' + JSON.stringify(res["user"]));

            //UPDATE MODE & EDIT
            if(this.isEdit){
              this.isSkills = false;
              this.placeholder = this.isSkills ? 'What skills can you mentor?' : 'What would you like to learn?';
              this.util.stopLoading();
              this.navCtrl.pop();
            }else{
              this.isSkills = false;
              this.placeholder = this.isSkills ? 'What skills can you mentor?' : 'What would you like to learn?';
              this.util.stopLoading();
              this.navCtrl.setRoot(HomePage);
            }
          });
        }
      });
    }, 2000);
  }

  checkParams(){
    this.isSkills = this.navParams.get("isSkills");
    this.pageTitle = this.isSkills ? 'Skills' : 'Interests';
    this.placeholder = this.isSkills ? 'What skills can you mentor?' : 'What would you like to learn?';
    this.isEdit = this.navParams.get('isEdit');

    if(this.isEdit){
      this.selectedSkills = this.userProvider.getUser().skills;
      this.selectedInterests = this. userProvider.getUser().aoi;
    }
    console.log(JSON.stringify(this.selectedSkills));
  }

  addItem(name){

    this.util.showLoading(false, 'Adding ' + this.searchString);
    // updateing of the user
    setTimeout(()=>{
      let item = {
        name:name
      };
      // add item to db
      this.skillProvider.addItem(item).subscribe((res)=>{
        // get skills again
        this.getAllSkills();
        this.getAllInterests();
        // update selected
        this.updateSelected(res["skill"]);
        this.util.stopLoading();
      });
    }, 2000);
  }

  disableButton(){
    if(this.isSkills && !this.selectedSkills.length){
      return true;
    }else return !this.isSkills && !this.selectedInterests.length;
  }

  close(){
    this.navCtrl.pop();
  }

}
