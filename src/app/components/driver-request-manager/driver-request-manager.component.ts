import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ReservationService } from '../../services/reservation-service/reservation.service';
import { Reservation } from 'src/app/models/reservation';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-driver-request-manager',
  templateUrl: './driver-request-manager.component.html',
  styleUrls: ['./driver-request-manager.component.css'],
})
export class DriverRequestManagerComponent implements OnInit {
  driverRequest: Reservation[] = [];
  currentRiderInfo: User;
  constructor(
    private reservationService: ReservationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getReservations();
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

        this.cancelRemainingRequestForRider(riderId, driverId);

        this.getReservations();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  cancelRemainingRequestForRider(riderId: string, driverId: string) {
    // grabbing all reservation to cancel anything pending
    let riderIdInt = parseInt(riderId);
    this.reservationService
      .getAllReservationsByRiderID(riderIdInt)
      .then((data) => {
        if (data.length > 0) {
          data.forEach((element) => {
            if (element.status == 1) {
              this.reservationService
                .denyReservation(element.rider.userId, element.reservationId)
                .then((data) => {
                })
                .catch((error) => console.log(error));
            }
          });
        }
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

  getRiderInfo(currentRiderInfo: User) {
    this.currentRiderInfo = currentRiderInfo;
  }
}
