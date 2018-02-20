import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule} from "@angular/common/http";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import { UserProvider } from '../providers/user/user';
import {AddSkillsPage} from "../pages/add-skills/add-skills";
import { UtilityProvider } from '../providers/utility/utility';
import {MentorPromptPage} from "../pages/mentor-prompt/mentor-prompt";
import {UserDetailPage} from "../pages/user-detail/user-detail";
import { SkillProvider } from '../providers/skill/skill';
import {LoginPageModule} from "../pages/login/login.module";
import {RegisterPageModule} from "../pages/register/register.module";
import {AddSkillsPageModule} from "../pages/add-skills/add-skills.module";
import {MentorPromptPageModule} from "../pages/mentor-prompt/mentor-prompt.module";
import {UserDetailPageModule} from "../pages/user-detail/user-detail.module";
import { TestimonialProvider } from '../providers/testimonial/testimonial';


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    RegisterPageModule,
    AddSkillsPageModule,
    MentorPromptPageModule,
    UserDetailPageModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      preloadModules:false,
      mode:'md'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AddSkillsPage,
    MentorPromptPage,
    UserDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    UtilityProvider,
    UserDetailPage,
    SkillProvider,
    TestimonialProvider
  ]
})
export class AppModule {}
