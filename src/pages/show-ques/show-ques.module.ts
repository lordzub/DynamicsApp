import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowQuesPage } from './show-ques';

@NgModule({
  declarations: [
    ShowQuesPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowQuesPage),
  ],
})
export class ShowQuesPageModule {}
