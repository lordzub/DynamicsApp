import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { config } from './app.firebaseconfig';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';
import { LoginPage } from '../pages/login/login';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

import { Camera } from '@ionic-native/camera';


import { Base64 } from '@ionic-native/base64';

import {ShowQuesPage} from '../pages/show-ques/show-ques';


import { QuestionsPage } from '../pages/questions/questions';
import {AddquestionPage} from '../pages/addquestion/addquestion';
import { SignupPage } from '../pages/signup/signup';



import { CameraProvider } from '../providers/camera/camera';
import { LocalNotifications } from '@ionic-native/local-notifications';


@NgModule({
  declarations: [
    MyApp,
    QuestionsPage,
    AddquestionPage,
    LoginPage,
    ShowQuesPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    QuestionsPage,
    AddquestionPage,
    LoginPage,
    ShowQuesPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AngularFireAuth,
    AuthProvider,
    UserProvider,
    ImghandlerProvider,
    File,
    FilePath,
    FileChooser,
    Camera,
    CameraProvider,
    Base64,
    LocalNotifications
  ]
})
export class AppModule {}
