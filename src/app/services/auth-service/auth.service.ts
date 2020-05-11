import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * This is the Authorization Service
   */

  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();
  loggedIn = false;

  /**
   * This is the constructor
   * @param router Creates a router instance
   */
  constructor(private router: Router, private http: HttpClient) {}

  /**
   * An user object is created
   */
  public user: any = {};
  public admin: Admin = new Admin();

  /**
   * This function logs the user into the application
   * @param user
   * @param chosenUserName
   */

  login(user: User, chosenUserName: string) {
    if (user.userName === chosenUserName) {
      this.user = user;
      if (this.user.isDriver) {
        this.router.navigate(['/home/riders']);
      } else {
        this.router.navigate(['/home/drivers']);
      }

      this.fireIsLoggedIn.emit(this.user);
    } else {
      return false;
    }
  }

  /**
   * This function returns an emitter.
   */

  loginAsAdmin(admin: Admin, userName: string) {
    if (admin.userName === userName) {
      this.admin = admin;
      this.router.navigate(['/admin']);
      this.fireIsLoggedIn.emit(this.admin);
    } else {
      return false;
    }
  }

  getEmitter() {
    return this.fireIsLoggedIn;
  }

  public authMe(username: string, password: string) {
    return this.http
      .get(`${environment.loginUri}?userName=${username}&passWord=${password}`)
      .toPromise();
  }
}
