import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {CameraProvider} from '../../providers/camera/camera';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { ActionSheetController } from 'ionic-angular';
import {storage} from 'firebase';
import firebase from 'firebase';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { UserProvider } from '../../providers/user/user';
import { LocalNotifications } from '@ionic-native/local-notifications';


/**
 * Generated class for the AddquestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addquestion',
  templateUrl: 'addquestion.html',
})
export class AddquestionPage {
    StudentNumber: string;
  someTextUrl;
  selectedPhoto;
    selectedPhoto1;
  loading;
  currentImage;
  nativepath: any;

  TutNo: number;
  QuesNo: number;
  recommendation_adding: string;
  Description: String;


  firedata = firebase.database().ref('/Questions');
  firestore = firebase.storage();

public WorkingDataUrl: string;



  constructor(public actionSheetCtrl: ActionSheetController, private camera:Camera,public imgservice: ImghandlerProvider,
     public loadingCtrl: LoadingController,public zone: NgZone, public filechooser: FileChooser,public navCtrl: NavController,
      public userservice: UserProvider, private localNotifications: LocalNotifications) {
       var QuesUrl;
       this.WorkDataUrl = " ";
           this.WorkDataUrl1  =" ";
            this.WorkDataUrl2  =" ";
            this.WorkDataUrl3  =" ";
            this.WorkDataUrl4  =" ";
           this.WorkDataUrl5 =" ";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddquestionPage');
    this.loaduserdetails();

  }

  loaduserdetails() {
    this.userservice.getuserdetails().then((res: any) => {
      this.StudentNumber = res.StudentNumber;
        console.log(this.StudentNumber);
    })
  }

  public QuestionDataUrl: string;




  public  i =0;
  public  x =0;
  public y =0;
  public AA: string;

  public  WorkDataUrl: string;
  public  WorkDataUrl1: string;
  public  WorkDataUrl2: string;
  public  WorkDataUrl3: string;
  public  WorkDataUrl4: string;
  public  WorkDataUrl5: string;



  captureWorking() {
     this.x=1;
      this.i++;
      this.takePic();
      console.log(this.x);

    }

    chooseWorkingimage() {
      this.i++;
      let loader = this.loadingCtrl.create({
        content: 'Please wait'
      })
    //  loader.present();
      this.imgservice.uploadimage().then((uploadedurl: any) => {
    //    loader.dismiss();
        this.zone.run(() => {

          if (this.i ==1)
          {
            this.WorkDataUrl1 = uploadedurl;
          }
           if ( this.i ==2)
            {
            this.WorkDataUrl2 = uploadedurl;
            }
           if ( this.i ==3)
              {
                this.WorkDataUrl3 = uploadedurl;
              }
            if ( this.i ==4)
                {
                  this.WorkDataUrl4 = uploadedurl;
                }
             if ( this.i ==5)
                  {
                    this.WorkDataUrl5 = uploadedurl;
                  }



        })
      })
    }


takePic()
{
console.log(this.x);
         const options: CameraOptions = {
           quality: 100,
           targetHeight: 500,
           targetWidth: 500,
           destinationType: this.camera.DestinationType.DATA_URL,
           encodingType: this.camera.EncodingType.JPEG,
           mediaType: this.camera.MediaType.PICTURE,
           correctOrientation: true
         }

         this.camera.getPicture(options).then((imageData) => {

           this.loading = this.loadingCtrl.create({
             content: 'Please wait...'
           });
        this.loading.present();

           this.selectedPhoto  = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);
           if (this.x==0)
           {
           this.QuestionDataUrl = 'data:image/jpeg;base64,' + imageData;
           }


           if (this.x==1)
           {
             if (this.i ==1)
             {

               this.WorkDataUrl1 = 'data:image/jpeg;base64,' + imageData;

                   }
              if ( this.i ==2)
               {

               this.WorkDataUrl2 = 'data:image/jpeg;base64,' + imageData;

               }
              if ( this.i ==3)
                 {
                   this.WorkDataUrl3 = 'data:image/jpeg;base64,' + imageData;
                 }
               if ( this.i ==4)
                   {
                     this.WorkDataUrl4 = 'data:image/jpeg;base64,' + imageData;
                   }
                if ( this.i ==5)
                     {
                       this.WorkDataUrl5 = 'data:image/jpeg;base64,' + imageData;
                     }
           }


           this.upload();
         }, (err) => {
           console.log('error', err);
         });
}



      captureQuestion()
      {

    this.x=0;
    this.takePic();
     }

     dataURItoBlob(dataURI) {
      // code adapted from: http://stackoverflow.com/questions/33486352/cant-upload-image-to-aws-s3-from-ionic-camera
      let binary = atob(dataURI.split(',')[1]);
      let array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
    };


    upload() {

      if (this.x==0)
      {
       if (this.selectedPhoto) {
         var uploadTask = firebase.storage().ref().child('images/'+this.TutNo+'/'+this.QuesNo+'/question.png').put(this.selectedPhoto);
         uploadTask.then((result) => {

           firebase.storage().ref().child('images/'+this.TutNo+'/'+this.QuesNo+'/question.png').getDownloadURL().then((url) => {
             this.AA = url.toString();

            this.loading.dismiss();
           }).catch((err) => {
              console.log(err);
           });
          // console.log(QuesUrl1.toString());
          // this.AA = firebase.storage().ref().child('images/'+this.TutNo+'/'+this.QuesNo+'/question.png').getDownloadURL().toString();


    },
    (err) => {
        // something didn't work
       console.log(err);
    });

        }
       }
       if (this.x==1)
       {

         var uploadTask = firebase.storage().ref().child('images/'+this.TutNo+'/'+this.QuesNo+'/working'+this.i+'.png').put(this.selectedPhoto);
         uploadTask.then((result) => {

           firebase.storage().ref().child('images/'+this.TutNo+'/'+this.QuesNo+'/working'+this.i+'.png').getDownloadURL().then((url) => {
            if (this.i ==1)
            {
            this.WorkDataUrl1 = url.toString();
            }
            if (this.i ==2)
            {
            this.WorkDataUrl2 = url.toString();
            }
            if (this.i ==3)
            {
            this.WorkDataUrl3 = url.toString();
            }
            if (this.i ==4)
            {
            this.WorkDataUrl4 = url.toString();
            }
            if (this.i ==5)
            {
            this.WorkDataUrl5 = url.toString();
            }
         this.loading.dismiss();
           }).catch((err) => {
              console.log(err);
           });
           //this.loading.dismiss();
          // console.log(QuesUrl1.toString());
          // this.AA = firebase.storage().ref().child('images/'+this.TutNo+'/'+this.QuesNo+'/question.png').getDownloadURL().toString();


    },
    (err) => {
        // something didn't work
       console.log(err);
    });

       }

     }






     onSuccess = snapshot => {
       console.log('sucess');
       this.loading.dismiss();
    };

    onError = error => {
      console.log("error", error);
      //this.loading.dismiss();
    };



postQuestion()
{

  this.localNotifications.schedule({
    id: 1,
    title: 'New Query!',
    text: 'By User X',
    //sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
    //data: { secret: key }
  });
  
  firebase.database().ref('Questions/Tutorial:'+this.TutNo+"/Question No: "+this.QuesNo+"/").set({
   Tutno: this.TutNo,
   QuesNo: this.QuesNo,
   Description:this.Description,
   QuesUrl : this.AA,
   WorkDataUrl1: this.WorkDataUrl1,
   WorkDataUrl2: this.WorkDataUrl2,
   WorkDataUrl3: this.WorkDataUrl3,
   WorkDataUrl4: this.WorkDataUrl4,
   WorkDataUrl5: this.WorkDataUrl5,
   PostedBy: this.StudentNumber
  });

this.navCtrl.pop();


}




    chooseQuestionimage() {

      let loader = this.loadingCtrl.create({
        content: 'Please wait'
      })
  //    loader.present();
      this.imgservice.uploadimage().then((uploadedurl: any) => {
    //    loader.dismiss();
        this.zone.run(() => {
      this.QuestionDataUrl = uploadedurl;
      this.AA = uploadedurl;

        })
      })
    }

    presentWorkingActionSheet() {
        const actionSheet = this.actionSheetCtrl.create({
          title: 'Modify your album',
          buttons: [
            {
              text: 'Take Picture',
              role: 'destructive',
              handler: () => {
                this.captureWorking();
                console.log('Destructive clicked');
              }
            },{
              text: 'Select from media',
              handler: () => {
                this.chooseWorkingimage();
                console.log('Archive clicked');
              }
            },{
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        actionSheet.present();
      }

      presentQuestActionSheet() {
          const actionSheet = this.actionSheetCtrl.create({
            title: 'Modify your album',
            buttons: [
              {
                text: 'Take Picture',
                role: 'destructive',
                handler: () => {
                  this.captureQuestion();
                  console.log('Destructive clicked');
                }
              },{
                text: 'Select from media',
                handler: () => {
                  this.chooseQuestionimage();
                  console.log('Archive clicked');
                }
              },{
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              }
            ]
          });
          actionSheet.present();
        }

        sendFeedback(){
          firebase.database().ref('recommendation_adding').push({

           Ans: this.recommendation_adding,
           StudentNumber: this.StudentNumber
          });
          this.recommendation_adding ='';
        }

}
