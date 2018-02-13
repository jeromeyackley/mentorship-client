import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MentorPromptPage } from './mentor-prompt';

@NgModule({
  declarations: [
    MentorPromptPage,
  ],
  imports: [
    IonicPageModule.forChild(MentorPromptPage),
  ],
})
export class MentorPromptPageModule {}
