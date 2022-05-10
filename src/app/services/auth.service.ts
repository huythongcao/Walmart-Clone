import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://reqres.in';
  private saveTokenName = 'token';
  public user = null;

  constructor(private http: HttpClient) {
    let token = localStorage.getItem(this.saveTokenName);
    if (token) {
      let decoded = jwtDecode(token);
      this.user = decoded;
      this.user.token = token;
      console.log(this.user);
    }
  }

  getUserProfile() {
    return this.http.get(this.baseUrl + '/api/users/' + this.user.id);
  }
  login(user) {
    return this.http.post(`${this.baseUrl}/api/login`, user).pipe(
      map(
        (res) =>
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOjIsIm5hbWUiOiJKYW5ldCIsImVtYWlsIjoiamFuZXQud2VhdmVyQHJlcXJlcy5pbiIsImF2YXRhIjoiaHR0cHM6Ly9yZXFyZXMuaW4vaW1nL2ZhY2VzLzItaW1hZ2UuanBnIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTE2MjM5MDIyfQ.upeUuEQKUmL9SV1TN1USkbxI1eWS7cSR_tjrcKfvByY'
      ),
      tap((token: string) => {
        let decoded = jwtDecode(token);
        this.user = decoded;
        this.user.token = token;

        localStorage.setItem(this.saveTokenName, token);
      })
    );
  }
  isLoggedIn(): boolean {
    return !!this.user;
  }

  logout() {
    localStorage.removeItem(this.saveTokenName);
    this.user = null;
  }
}
