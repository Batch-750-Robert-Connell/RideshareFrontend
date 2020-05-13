import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ReservationService } from '../../services/reservation-service/reservation.service';
import { Reservation } from 'src/app/models/reservation';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-driver-request-manager',
  templateUrl: './driver-request-manager.component.html',
  styleUrls: ['./driver-request-manager.component.css'],
})
export class DriverRequestManagerComponent implements OnInit {
  driverRequest: Reservation[] = [];
  constructor(
    private reservationService: ReservationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getReservations();
    console.log(this.driverRequest.length + 'GHIS:KJFLDJLJSLJFLJDL');
  }

  getReservations() {
    let id = parseInt(sessionStorage.getItem('userid'));
    this.reservationService
      .getAllReservationsByDriverID(id)
      .then((data) => {
        if (data != null) {
          this.driverRequest = data;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  approveRequest(
    riderId: string,
    driverId: string,
    reservationId: string,
    riderName: string
  ) {
    this.reservationService
      .approveReservation(riderId, driverId, reservationId)
      .then((data) => {
        this.snackBar.open(
          `Sending Email to let ${riderName} know you will be picking them up soon. `,
          '',
          {
            data: {
              html: '<h1>The Header</h1><p>The paragraph of text</p>',
            },
            duration: 2000,
            direction: 'ltr',
            politeness: 'assertive',
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['success'],
          }
        );

        this.getReservations();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  denyRequest(riderId: string, reservationId: string) {
    this.reservationService
      .denyReservation(riderId, reservationId)
      .then((data) => {
        this.snackBar.open('Request Denied.  ', '', {
          duration: 2000,
          direction: 'ltr',
          politeness: 'assertive',
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['fail'],
        });
        this.getReservations();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
