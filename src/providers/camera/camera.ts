
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {AddquestionPage} from '../../pages/addquestion/addquestion';


/*
  Generated class for the CameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraProvider {

  constructor(private camera:Camera) {
    console.log('Hello CameraProvider Provider',);

  }
  public  i =0;
  public  captureWorkDataUrl: string;
  public  captureWorkDataUrl1: string;
  public  captureWorkDataUrl2: string;
  public  captureWorkDataUrl3: string;
  public  captureWorkDataUrl4: string;
  public  captureWorkDataUrl5: string;


  captureWorking() {
      this.i++;
      console.log(this.i);
      const cameraOptions: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
      };

      this.camera.getPicture(cameraOptions).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        this.captureWorkDataUrl = 'data:image/jpeg;base64,' + imageData;
        if (this.i ==1)
        {
          this.captureWorkDataUrl1 = this.captureWorkDataUrl;
        }
        else if ( this.i ==2)
          {
            this.captureWorkDataUrl2 = this.captureWorkDataUrl;
          }
          else if ( this.i ==3)
            {
              this.captureWorkDataUrl3 = this.captureWorkDataUrl;
            }
            else if ( this.i ==4)
              {
                this.captureWorkDataUrl4 = this.captureWorkDataUrl;
              }
              else if ( this.i ==5)
                {
                  this.captureWorkDataUrl5 = this.captureWorkDataUrl;
                }


      }, (err) => {
        // Handle error
      });
      /*
      this.navController.push(AddquestionPage, {
	    param1: this.captureDataUrl});
*/

    }

}
