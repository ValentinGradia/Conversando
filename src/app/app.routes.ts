import { Routes } from '@angular/router';
import { SplashComponent } from './splash/splash.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { HomeComponent } from './componentes/home/home.component';
import { PrimerChatComponent } from './componentes/primer-chat/primer-chat.component';
import { SegundoChatComponent } from './componentes/segundo-chat/segundo-chat.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  // },
  {
    path : '',
    redirectTo : '/splash',
    pathMatch : 'full'
  },
  {
    path : 'splash',
    component : SplashComponent
  },
  {
    path : 'inicio',
    component : InicioComponent
  },
  {
    path : 'home',
    component : HomeComponent
  },
  {
    path : 'primerChat',
    component : PrimerChatComponent
  },
  {
    path : 'segundoChat',
    component : SegundoChatComponent
  }
];

