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
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphbmV0IiwiZW1haWwiOiJqYW5ldC53ZWF2ZXJAcmVxcmVzLmluIiwiYXZhdGFyIjoiaHR0cHM6Ly9yZXFyZXMuaW4vaW1nL2ZhY2VzLzItaW1hZ2UuanBnIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTE2MjM5MDIyLCJpZCI6Mn0.eT-ZlZUt3EZhocb1rWZIjf2BiNU65cKZdWc5MFzON5o'
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

  isAdmin(): boolean {
    if(this.user && this.user.isAdmin) {
      return true;
    };
    return false;
  }

  logout() {
    localStorage.removeItem(this.saveTokenName);
    this.user = null;
  }
}
