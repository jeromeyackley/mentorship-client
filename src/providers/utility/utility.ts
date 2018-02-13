import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Loading, LoadingController} from 'ionic-angular';

/*
  Generated class for the UtilityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilityProvider {
  public loading?: Loading;
  private isLoading: boolean;
  constructor(public http: HttpClient, private loadingController: LoadingController) {
    console.log('Hello SpinnerProvider Provider');
  }

  async showLoading(pc?: boolean, message?: string) {
    this.isLoading = true;
    this.loading = null;
    this.loading = this.loadingController.create({
      content: message || 'Please wait...',
      dismissOnPageChange: pc
    });

    await this.loading.present();
  }

  async stopLoading() {
    this.isLoading = false;
    return this.loading.dismiss().catch(()=>{});
  }

}
