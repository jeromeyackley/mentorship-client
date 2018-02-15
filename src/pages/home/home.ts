import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UserDetailPage} from "../user-detail/user-detail";
import {UserProvider} from "../../providers/user/user";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users = [];
  _users = [];
  suggestions = [];

  constructor(public navCtrl: NavController, public userProvider:UserProvider) {

    this.getUsers();
  }

  getSearchResults(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.users = this._users.filter((user) => {
        return (user.first_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  // getSearchResults(ev: any) {
  //   // Reset items back to all of the items
  //   this.initializeItems();
  //
  //   // set val to the value of the searchbar
  //   let val = ev.target.value;
  //
  //   // if the value is an empty string don't filter the items
  //
  //   if(this.isSkills){
  //     if (val && val.trim() != '') {
  //       this.skills = this._skills.filter((skill) => {
  //         return (skill.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //       })
  //     }
  //   }else{
  //     if (val && val.trim() != '') {
  //       this.interests = this._interests.filter((interest) => {
  //         return (interest.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //       })
  //     }
  //   }
  //
  //
  // }

  initializeItems() {
    this.users = this._users;
  }

  getUsers(){
    // this._users = ['Kevin', 'Alisher', 'Jerome', "Eric", "Ro", "Jyoti"];
    this.userProvider.getAllUsers().subscribe((res)=>{
      if(res["success"] === true){
        this._users = res["users"];
        this.initializeItems();

      }else{
        this._users = [];
      }
    })
  }

  selectUser(user){
    this.navCtrl.push(UserDetailPage, {user:{first_name:user}, canEdit:false})
  }

  goToAccountPage(){
    this.navCtrl.push(UserDetailPage, { user: this.userProvider.getUser(), canEdit:true})
  }

  getSuggestions(){

  }

}
