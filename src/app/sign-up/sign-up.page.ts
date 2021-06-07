import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  email:string;
  password:string;
  password1:string;
  name:string;
  gender:string;
  age:number;
  @ViewChild("id_f") file_id:any;
  constructor(private route:Router,private alertController:AlertController , private fire:AngularFireAuth, private storage:AngularFireStorage,private firestore:AngularFirestore) {
    
   }
   signUp(){
    if(this.verifPasswords(this.password,this.password1)==false){
      this.presentAlertPasswordsDontMatch();
    }
    else{
      this.fire.auth.createUserWithEmailAndPassword(this.email, this.password).then ( data=> {
        data.user.sendEmailVerification();
            const files=this.file_id.nativeElement.files[0];
            const filePath='/Users/'+`${Date.now()}_${files.name}`;
            this.storage.upload(filePath,files);
            this.presentAlertOk();
        return this.firestore.collection("Users").doc(data.user.uid).set({name:this.name ,age:this.age ,email : this.email , password : this.password , imageUrl:filePath}) })       .catch( err=> { 
          console.log(err);
          
          this.presentAlert()}) 
      
      }
   }
   async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: "Other Errors",
      message: 'Please enter other informations   .',
      buttons: [{
        text: 'ok',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          this.route.navigateByUrl("/home");
        }
      }]
    });

    await alert.present();

  }
  async presentAlertOk() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: "Congratulations!you've just joined us ! .",
      buttons: [{
        text: 'ok',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          this.route.navigateByUrl("/home");
        }
      }]
    });

    await alert.present();

  }
   async presentAlertPasswordsDontMatch() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: "passwords don't match ",
      message: 'Please verify the passwords  .',
      buttons: [{
        text: 'ok',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          this.route.navigateByUrl("/home");
        }
      }]
    });

    await alert.present();

  }
   verifPasswords(password1,password2){
    if (password1==password2) {
      return true;
    } else {
      return false;
    }
  }
  ngOnInit() {
  }

}
