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
        //filter skills of each user
        return user.skills.some((skill, index, array)=>{
          return skill.toLowerCase().includes(val.toLowerCase());
        });
      });
    }
  }

  initializeItems() {
    this.users = this._users;
  }

  getUsers(){
    this.userProvider.getAllUsers().subscribe((res)=>{
      if(res["success"] === true){
        this._users = res["users"];
        this.initializeItems();
      }else{
        this._users = [];
      }
    });
  }

  selectUser(user){
    this.navCtrl.push(UserDetailPage, {user:user, canEdit:false});
  }

  goToAccountPage(){
    this.navCtrl.push(UserDetailPage, { user: this.userProvider.getUser(), canEdit:true});
  }

}
