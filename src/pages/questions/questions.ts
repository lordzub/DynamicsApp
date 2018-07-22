import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddquestionPage} from '../addquestion/addquestion';
import {ShowQuesPage} from '../show-ques/show-ques';

import firebase from 'firebase';

/**
 * Generated class for the QuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class QuestionsPage {

public Data: Array<any> = [];
public QuesNo: Array<any> = [];
public itemRef: firebase.database.Reference = firebase.database().ref('/Questions');


  constructor(public navCtrl: NavController, public navParams: NavParams) {

  //  this.readData();

  }

  ionViewDidLoad() {
    this.itemRef.on('value', itemSnapshot => {
      this.Data = [];
      this.QuesNo=[];
      itemSnapshot.forEach( itemSnap => {
        var key = itemSnap.key;
      //  this.TutNo.push(itemSnap.key);

        var QuestionRef = firebase.database().ref('Questions/'+key+'/');
        QuestionRef.on('value', Snapshot =>
      {

       Snapshot.forEach( Snap => {
         var key1 = Snap.key;
         this.QuesNo.push(key1);
         console.log(key1);

         this.Data.push(Snap.val());
      //   console.log(this.TutNo);
      });
      });
        return false;



      });



  });
}

  ionViewWillEnter()
  {


  }

openAdQuestionsPage()
{
  this.navCtrl.push(AddquestionPage);
}
showQuestion(index: number)
{
  //console.log(index);
  //console.log(this.Data[index]);
  this.navCtrl.push(ShowQuesPage, {
    question: this.Data[index]
});
}
}
