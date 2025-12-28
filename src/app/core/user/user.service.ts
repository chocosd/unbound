import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly currentUserUrl = '/assets/data/current-user.json';
  public readonly currentUser = signal<User | null>(null);

  constructor(private readonly http: HttpClient) {}

  fetchCurrentUser(): Observable<User> {
    return this.http.get<User>(this.currentUserUrl).pipe(tap((u) => this.currentUser.set(u)));
  }
}
