import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiConnectionService } from './api-connection.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public redirectUrl: string = '/';

  constructor(
    private auth: AngularFireAuth,
    private apiData: ApiConnectionService
  ) {
    this.auth.setPersistence('none');
  }

  public isLoggedIn(): Observable<boolean> {
    return this.auth.user.pipe(map((user) => !!user && !!user.uid));
  }

  public async isAdmin(): Promise<boolean> {
    try {
      const uid = await this.auth.currentUser.then((user) => user.uid);
      console.log('uid: ', uid);
      const userData = await this.apiData.getUserData(uid);
      return userData.userGroup === 'admin';
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public login(email, password): Promise<boolean> {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => !!user.user);
  }

  public signup(email, password): Promise<boolean> {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => !!user.user);
  }

  public logout(): Promise<void> {
    return this.auth.signOut();
  }
}
