import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

// Define the shape of the user object we get from the API
export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'student' | 'admin';
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5001/api/users';

  // A BehaviorSubject holds the current user value and broadcasts it to subscribers.
  // We initialize it with the user data from localStorage, if it exists.
  private userSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());

  // Expose the user data as a public observable. Components can subscribe to this.
  public user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // --- Core Methods ---

  register(userData: any): Observable<User> {
    return this.http
      .post<User>(`${this.apiUrl}/register`, userData)
      .pipe(tap((user) => this.handleAuth(user)));
  }

  login(credentials: any): Observable<User> {
    return this.http
      .post<User>(`${this.apiUrl}/login`, credentials)
      .pipe(tap((user) => this.handleAuth(user)));
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null); // Notify all subscribers that the user is logged out
    this.router.navigate(['/']); // Redirect to home
  }

  // --- Helper Methods ---

  public get currentUserValue(): User | null {
    return this.userSubject.value;
  }

  public isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  public isAdmin(): boolean {
    return this.currentUserValue?.role === 'admin';
  }

  private handleAuth(user: User): void {
    if (user && user.token) {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user); // Push the new user data to all subscribers
    }
  }

  private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }
}
