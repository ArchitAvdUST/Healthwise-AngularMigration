import {Route} from '@angular/router';
import {HomeComponent} from './home/home.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.loginRoutes),
  },
  {
    path: '',
    component: HomeComponent,
  },
];
