import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
//import { environment } from 'src/environments/environment'; // Adjust if necessary

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `http://localhost:5000/api/users`; // Adjust to your API endpoint

  constructor(private http: HttpClient) {}

  login(credentials: {username: string; password: string}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  getUserRole(username: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/${username}/role`, { headers });
  }

  checkUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${username}`);
  }

  register(username: string, password: string,role: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, {username, password, role});
  }

  registerPatient(name:String, age:String, sex:String, email:String, phone:String, address:String, username:String): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`,{name,age,sex,email,phone,address,username})
  }
}
