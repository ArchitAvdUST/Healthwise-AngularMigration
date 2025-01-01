import {Route} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import { provideHttpClient } from '@angular/common/http';

export const loginRoutes: Route[] = [{path: '', component: LoginComponent}];
