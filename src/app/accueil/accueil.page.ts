import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  user:any;
  animes:any=[];
  img1:any;
  constructor(private router: Router,private fireStore:AngularFirestore , private firestorage:AngularFireStorage) {
    this.user=JSON.parse(localStorage.getItem('user'));
    //console.log(this.user.image);
    this.img1=this.firestorage.ref(this.user.image).getDownloadURL();
    console.log(this.user);
    this.getAnimes();
    
  }
  addToList(anime){
    this.fireStore.collection("WatchedList").add({idUser:this.user.id,nomUser:this.user.nom })
      .then( data => { 
        
        //this.presentToast("Rent Successfuly");
        this.router.navigateByUrl("/home-page")
      })
      .catch( err => { 
        //this.presentToast(err);
        console.log(err); });
  }
  getAnimes(){
    this.fireStore.collection("AnimeListe").snapshotChanges()
    .subscribe
    ( data=>{
      this.animes=data.map(
        e=>{
          console.log({
            id:e.payload.doc.id,
            nom:e.payload.doc.data()['nom'],
            rate:e.payload.doc.data()['rate'],
            date:e.payload.doc.data()['date'],
            nbEpisode:e.payload.doc.data()['nbEpisode'],
            image:e.payload.doc.data()['image']
          });
          
         return{
            id:e.payload.doc.id,
            nom:e.payload.doc.data()['nom'],
            rate:e.payload.doc.data()['rate'],
            date:e.payload.doc.data()['date'],
            nbEpisode:e.payload.doc.data()['nbEpisode'],
            image:e.payload.doc.data()['image']
          }   
      }
      );})
  }





  ngOnInit() {
  }

}
