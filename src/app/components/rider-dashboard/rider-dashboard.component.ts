import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-rider-dashboard',
  templateUrl: './rider-dashboard.component.html',
  styleUrls: ['./rider-dashboard.component.css']
})
export class RiderDashboardComponent implements OnInit {

  /**
   * Set up the url string to the env var
   * Creates a new user object
   */
  url: string = environment.userUri;
  currentUser: string = '';
  requestedDriversId: string = '';
  requestedDriversName: string = '';
  requestedDriversCar: string = '';
  driverId: string = sessionStorage.getItem('driverid');

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }



  ngOnInit() {

    if(sessionStorage.getItem('userid') != null){
      this.currentUser = sessionStorage.getItem('name');
      this.requestedDriversId = sessionStorage.getItem('driverId');
      this.requestedDriversName = sessionStorage.getItem('driverName');
      this.requestedDriversCar = sessionStorage.getItem('driversCar');
    } else {
      this.currentUser = '';
     }
    }
}
