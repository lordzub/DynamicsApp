import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { UserProvider } from '../../providers/user/user';

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
public Anss: Array<any> = [];
public NoOfA: Array<any> = [];
public UID: Array<any> = [];
public question:any;
recommendation_document: string;
public myStuff:string;
public Ans:any;
public AnsStudent:any;
 StudentNumber:String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider)
  {
this.question = navParams.get('question');
console.log(this.question);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowQuesPage');


var itemRef = firebase.database().ref('Answers/Tutorial:'+this.question.Tutno+'/');
    itemRef.on('value', itemSnapshot => {
      this.Anss = [];
      this.NoOfA =[];
      this.UID = [];

      itemSnapshot.forEach( itemSnap => {
      //  var key = itemSnap.key;
      //  this.TutNo.push(itemSnap.key);

        var QuestionRef = firebase.database().ref('Answers/Tutorial:'+this.question.Tutno+'/Question No: '+this.question.QuesNo);
        QuestionRef.on('value', Snapshot =>
      {

       Snapshot.forEach( Snap => {
         var key1 = Snap.key;
         //this.QuesNo.push(key1);





         var QuestionRef = firebase.database().ref('Answers/Tutorial:'+this.question.Tutno+'/Question No: '+this.question.QuesNo+'/'+key1);
         QuestionRef.on('value', Snapshot =>
       {


        Snapshot.forEach( Snap => {
          var key2 = Snap.key;
          this.UID.push(key2);
          console.log(key2);


          var QuestionRef = firebase.database().ref('Answers/Tutorial:'+this.question.Tutno+'/Question No: '+this.question.QuesNo+'/'+key1+'/'+key2);
          QuestionRef.on('value', Snapshot =>
        {




           this.Anss.push(Snapshot.val().Ans);
            this.NoOfA.push(Snapshot.val().StudentNumber);
            console.log(this.NoOfA);
          console.log(this.Anss);



        });




       });
       });

      });
      });
        return false;



      });



    });












//console.log(this.Data.StudentNumber);

this.loaduserdetails();
  }


  loaduserdetails() {
    this.userservice.getuserdetails().then((res: any) => {
      this.StudentNumber = res.StudentNumber;
        console.log(this.StudentNumber);
    })
  }


  resize() {
    this.myInput.nativeElement.style.height = 'auto';
      this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }

  sendFeedback(){
    firebase.database().ref('recommendation_document').push({

     Ans: this.recommendation_document,
     StudentNumber: this.StudentNumber
    });
    this.recommendation_document ='';
  }

  deleteQuestion(i)
  {
    firebase.database().ref('Answers/Tutorial:'+this.question.Tutno+'/Question No: '+this.question.QuesNo+'/'+this.StudentNumber+'/'+this.UID[i]).remove();
  }



SendAns()
{

  firebase.database().ref('Answers/Tutorial:'+this.question.Tutno+"/Question No: "+this.question.QuesNo+"/"+this.StudentNumber).push({
   Ans: this.myStuff,
   StudentNumber: this.StudentNumber
  });
  this.myStuff ='';

}



}
