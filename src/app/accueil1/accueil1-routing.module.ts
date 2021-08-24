import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Accueil1Page } from './accueil1.page';
/*const routes: Routes = [
  {
    path: 'accueil1',
    component: Accueil1Page,
    children: [
      {
        path: 'accueil',
        children: [
          {
            path: '',
            loadChildren: ()=> import ('../accueil/accueil.module').then(m=>{m.AccueilPageModule})
          }
        ]
      },
      {
        path: 'chat',
        children: [
          {
            path: '',
            loadChildren: ()=> import ('../chat/chat.module').then(m=>{m.ChatPageModule})
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/accueil',
        pathMatch: 'full'
      }
    ]
  }
];*/
const routes: Routes = [
  {
    path: '',
    component: Accueil1Page,
    children: [{
      path: 'accueil',
      loadChildren: () => import('../accueil/accueil.module').then( m => m.AccueilPageModule)
    },
    {
      path: 'chat',
      loadChildren: () => import('../chat/chat.module').then( m => m.ChatPageModule)
    }]
  },
  {
    path: 'accueil',
    loadChildren: () => import('../accueil/accueil.module').then( m => m.AccueilPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('../chat/chat.module').then( m => m.ChatPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Accueil1PageRoutingModule {}
