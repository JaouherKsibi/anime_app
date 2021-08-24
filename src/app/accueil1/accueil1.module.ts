import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Accueil1PageRoutingModule } from './accueil1-routing.module';

import { Accueil1Page } from './accueil1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Accueil1PageRoutingModule
  ],
  declarations: [Accueil1Page]
})
export class Accueil1PageModule {}
