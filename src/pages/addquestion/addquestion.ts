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
  someTextUrl;
  selectedPhoto;
    selectedPhoto1;
  loading;
  currentImage;
  nativepath: any;

  TutNo: number;
  QuesNo: number;
  Description: String;


  firedata = firebase.database().ref('/Questions');
  firestore = firebase.storage();
public captureWorkingDataUrl: string;



  constructor(public actionSheetCtrl: ActionSheetController, private camera:Camera,public imgservice: ImghandlerProvider,
     public loadingCtrl: LoadingController,public zone: NgZone, public filechooser: FileChooser) {
       var QuesUrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddquestionPage');
  }



  public captureQuestionDataUrl: string;




  public  i =0;
  public  x =0;
  public y =0;
  public AA: string;
  public  captureWorkDataUrl: string;
  public  captureWorkDataUrl1: string;
  public  captureWorkDataUrl2: string;
  public  captureWorkDataUrl3: string;
  public  captureWorkDataUrl4: string;
  public  captureWorkDataUrl5: string;


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
      loader.present();
      this.imgservice.uploadimage().then((uploadedurl: any) => {
        loader.dismiss();
        this.zone.run(() => {

          if (this.i ==1)
          {
            this.captureWorkDataUrl1 = uploadedurl;
          }
           if ( this.i ==2)
            {
            this.captureWorkDataUrl2 = uploadedurl;
            }
           if ( this.i ==3)
              {
                this.captureWorkDataUrl3 = uploadedurl;
              }
            if ( this.i ==4)
                {
                  this.captureWorkDataUrl4 = uploadedurl;
                }
             if ( this.i ==5)
                  {
                    this.captureWorkDataUrl5 = uploadedurl;
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
          // this.captureQuestionDataUrl = 'data:image/jpeg;base64,' + imageData;
           }


           if (this.x==1)
           {
             if (this.i ==1)
             {

               this.captureWorkDataUrl1 = 'data:image/jpeg;base64,' + imageData;

                   }
              if ( this.i ==2)
               {

               this.captureWorkDataUrl2 = 'data:image/jpeg;base64,' + imageData;

               }
              if ( this.i ==3)
                 {
                   this.captureWorkDataUrl3 = 'data:image/jpeg;base64,' + imageData;
                 }
               if ( this.i ==4)
                   {
                     this.captureWorkDataUrl4 = 'data:image/jpeg;base64,' + imageData;
                   }
                if ( this.i ==5)
                     {
                       this.captureWorkDataUrl5 = 'data:image/jpeg;base64,' + imageData;
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
             console.log('AA--'+this.AA );
                console.log('url--'+url );

           }).catch((err) => {
              console.log(err);
           });
          // console.log(QuesUrl1.toString());
          // this.AA = firebase.storage().ref().child('images/'+this.TutNo+'/'+this.QuesNo+'/question.png').getDownloadURL().toString();
          firebase.database().ref('Stuff/').set({
           Tutno: this.TutNo,
           QuesNo: this.QuesNo,
           QuesUrl : this.AA
          });

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
         uploadTask.then(this.onSuccess, this.onError);
       }
     }






     onSuccess = snapshot => {
       console.log('sucess');

    };

    onError = error => {
      console.log("error", error);
      this.loading.dismiss();
    };






    chooseQuestionimage() {

      let loader = this.loadingCtrl.create({
        content: 'Please wait'
      })
      loader.present();
      this.imgservice.uploadimage().then((uploadedurl: any) => {
        loader.dismiss();
        this.zone.run(() => {
      this.captureQuestionDataUrl = uploadedurl;


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

}