import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from './api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(ApiEndpoints.GET_USERS_API);
  }


  getUser(username: string, password: string): Observable<any> {
    // return this.http.post<any>(ApiEndpoints.FIND_USER_API, { 'email': username, 'password': password }, { withCredentials: true });
    return this.http.post<any>(ApiEndpoints.LOGIN, { 'email': username, 'password': password }, { withCredentials: true });
  }

  // getToken(user): Observable<any> {
  //   return this.http.post<any>(ApiEndpoints.AUTH_TOKEN, { params: user });
  // }

}
