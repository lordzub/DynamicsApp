import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddquestionPage} from '../addquestion/addquestion'
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
public TutNo:String;
public QuesNo:String;
TutNum:Array<any>;



  constructor(public navCtrl: NavController, public navParams: NavParams) {
this.TutNum = new Array<any>();
    this.readData();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionsPage');

}

  ionViewWillEnter()
  {


  }

readData()
{

  var TutNoArr= [];
  var QuesNoArr= [];
  var QuesUrlArr = [];

console.log('ionViewWillEnter QuestionsPage');
var query = firebase.database().ref("Questions").orderByKey();
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
   var newPost = snapshot.val();
     console.log(newPost);
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
      console.log(key);


var query1 = firebase.database().ref("Questions/"+key).orderByKey();
      query1.once("value")
        .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
         var newPost1 = snapshot.val();
           console.log(newPost1);
            // key will be "ada" the first time and "alan" the second time
            var key1 = childSnapshot.key;
            console.log(key1);


          //  this.QuesNo = newPost1.QuesNo.val();



          var query2 = firebase.database().ref("Questions/"+key+"/"+key1).orderByKey();
                  query2.once("value")
                    .then(function(snapshot) {
                     var newPost2 = snapshot.val();

                      //  var ref = firebase.database().ref("Questions/"+key);


                        //var a = (snapshot.val() && snapshot.val().QuesNo);

                        var QNo = snapshot.val().QuesNo;
                        var TNo = snapshot.val().Tutno;
                        var QUrl = snapshot.val().QuesUrl;
                        this.TutNum.push(TNo);
                        TutNoArr.push(TNo);
                        QuesNoArr.push(QNo);
                        QuesUrlArr.push(QUrl);

                        console.log(TutNoArr);
                        console.log( QuesNoArr);
                        console.log(  QuesUrlArr);


                  });

        });
      });

  });
});

console.log( "aaaa    " +QuesNoArr);
}
openAdQuestionsPage()
{
  this.navCtrl.push(AddquestionPage);
}

}
