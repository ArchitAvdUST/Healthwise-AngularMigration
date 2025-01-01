import {Route} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import { provideHttpClient } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';

export const loginRoutes: Route[] = [{path: '', component: LoginComponent}];

export const registerRoutes: Route[] = [{path: '', component: RegisterComponent}];
