import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
//import { environment } from 'src/environments/environment'; // Adjust if necessary

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `http://localhost:5000/api/users/login`; // Adjust to your API endpoint

  constructor(private http: HttpClient) {}

  login(credentials: {username: string; password: string}): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }
}
