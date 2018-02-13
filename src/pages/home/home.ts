import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UserDetailPage} from "../user-detail/user-detail";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users = [];
  _users = [];

  constructor(public navCtrl: NavController) {

    this.getUsers();
    this.initializeItems();
  }

  getSearchResults(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.users = this._users.filter((skill) => {
        return (skill.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  initializeItems() {
    this.users = this._users;
  }

  getUsers(){
    this._users = ['Kevin', 'Alisher', 'Jerome', "Eric", "Ro", "Jyoti"];
  }

  selectUser(user){
    this.navCtrl.push(UserDetailPage, {user:user})
  }

}
