import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  email:string;
  password:string;
  constructor(private toastController: ToastController,private fireAuth:AngularFireAuth , private fireStore:AngularFirestore , private router : Router) {}
  login(){
    if(localStorage.getItem('user')==null){
      this.fireAuth.auth.signInWithEmailAndPassword(this.email,this.password).then(()=>{
        this.fireStore.collection('Users'/*,res=>res.where('id','==',this.fireAuth.auth.currentUser.uid)*/).snapshotChanges().subscribe(data=>{
          data.map(
            e=>{
              console.log(e.payload.doc.data()['imageUrl']);
              
             if(this.fireAuth.auth.currentUser.email==e.payload.doc.data()['email']){
                    localStorage.setItem('user',JSON.stringify({
                    id:e.payload.doc.id,
                    name:e.payload.doc.data()['name'],
                    age:e.payload.doc.data()['age'],
                    email:e.payload.doc.data()['email'],
                    password:e.payload.doc.data()['password'],
                    image:e.payload.doc.data()['imageUrl']
                  }));
                  this.router.navigateByUrl('/accueil');
              }
              
              return{
                id:e.payload.doc.id,
                name:e.payload.doc.data()['name'],
                age:e.payload.doc.data()['age'],
                email:e.payload.doc.data()['email'],
                password:e.payload.doc.data()['password'],
                imageUrl:e.payload.doc.data()['imageUrl']
              }
              
            
          
          }
          );
        });
        
      }).catch(err=>{
        this.presentToast(err);
      }
      )
    }
    else{
      this.router.navigateByUrl('/accueil');
    }
  }
  async presentToast(message1) {
    const toast = await this.toastController.create({
      message: message1,
      duration: 5000
    });
    toast.present();
  }
}
