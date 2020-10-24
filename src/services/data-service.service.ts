import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private httpClient: HttpClient) { }
  authenticateUser(body) {
    localStorage.clear();
    const headers = new HttpHeaders({
      mimeType: 'multipart/form-data',
    });
    return this.httpClient.post('http://localhost:5000/login', body, {
      headers,
      responseType: 'json',
      observe: 'response'
    }).pipe(
      map(response => {
        return response;
      })
    );
  }
  getUserList(body) {
    const headers = new HttpHeaders({
      mimeType: 'multipart/form-data',
    });
    return this.httpClient.post('http://localhost:5000/user/details', body, {
      headers,
      responseType: 'json',
      observe: 'response'
    }).pipe(
      map(response => {
        return response;
      })
    );
  }
  getChatDetails(body) {
    const headers = new HttpHeaders({
      mimeType: 'multipart/form-data',
    });
    return this.httpClient.post('http://localhost:5000/chats', body, {
      headers,
      responseType: 'json',
      observe: 'response'
    }).pipe(
      map(response => {
        return response;
      })
    );
  }
}
