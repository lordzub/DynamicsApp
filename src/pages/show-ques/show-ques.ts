import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the ShowQuesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-show-ques',
  templateUrl: 'show-ques.html',
})
export class ShowQuesPage {
  @ViewChild('myInput') myInput: ElementRef;
public data:any;
public myStuff:string;
public Ans:any;

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
this.data = navParams.get('question');
console.log(this.data);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowQuesPage');


    var QuestionRef = firebase.database().ref('Answers/Tutorial:'+this.data.Tutno+'/Question No: '+this.data.QuesNo);
    QuestionRef.on('value', Snapshot =>
  {

   Snapshot.forEach( Snap => {
  console.log(Snap.val());
   this.Ans = Snap.val();
   


  //   console.log(this.TutNo);
  });
  });








  }


  resize() {
    this.myInput.nativeElement.style.height = 'auto';
      this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }






SendAns()
{

  firebase.database().ref('Answers/Tutorial:'+this.data.Tutno+"/Question No: "+this.data.QuesNo+"/").set({
   Ans: this.myStuff
  });
  this.myStuff ='';

}



}
