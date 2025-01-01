import {Route} from '@angular/router';
import {HomeComponent} from './home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.loginRoutes),
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'patient',
    loadChildren: () => import('./patient/patient.routes').then((m) => m.patientRoutes),
  }
];
