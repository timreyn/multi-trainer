import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, Subject } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

export interface User {
  id: number;
  wca_id: string;
  name: string;
}

export interface LoginState {
  loggedIn: boolean;
  user: User | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginState : Observable<LoginState>;

  constructor(private http : HttpService) { }

  public state() : Observable<LoginState> {
    if (this.loginState === undefined) {
      this.loginState = this.http.get<User>("/auth/user").pipe(
        flatMap(user => of({loggedIn: true, user: user})),
        catchError(err => of({loggedIn: false, user: null})));
    }
    return this.loginState;
  }

  private onError() : LoginState {
    return {loggedIn: false, user: null};
  }

  private onSuccess(user : User) : LoginState {
    return {loggedIn: true, user: user};
  }
}
