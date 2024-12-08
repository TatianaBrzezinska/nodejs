import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, data).pipe(
      tap((response: any) => {
        const token = response.access_token;
        if (token) {
          localStorage.setItem('token', token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserId(): string | null {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log(decoded);
      return decoded.sub;
    }
    return null;
  }
}
