import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ReservationService } from '../../services/reservation-service/reservation.service';
import { Reservation } from 'src/app/models/reservation';
import { User } from 'src/app/models/user';

/**
 * Dashboard for driver. Displays the requests that the driver has.
 */
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

  /**
   * getReservations will populate the table with pending requests for each driver.
   */
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

  /**
   *
   * @param riderId
   * @param driverId
   * @param reservationId
   * @param riderName
   * approveRequest() is called when a driver accepts a pending request. When the approve button is
   * clicked, an alert will appear notifying that an email was sent to the rider.
   */
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

  /**
   *
   * @param riderId
   * @param driverId
   * If a rider has multiple pending requests to different drivers, cancelRemainingRequestForRider()
   * will be invoked once one of the driver approves one of these requests. This will make sure that
   * only one driver is assgined per rider request.
   *
   */
  cancelRemainingRequestForRider(riderId: string, driverId: string) {
    // grabbing all reservation to cancel anything pending
    let riderIdInt = parseInt(riderId);
    this.reservationService
      .getAllReservationsByRiderID(riderIdInt)
      .then((data) => {
        if (data.length > 0) {
          console.log(data);
          data.forEach((element) => {
            if (element.status == 1) {
              this.reservationService
                .denyReservation(element.rider.userId, element.reservationId)
                .then((data) => {
                  console.log(data);
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

  /**
   *
   * @param riderId
   * @param reservationId
   * denyRequest() is called when a driver denies a pending request. When the deny button is
   * clicked, an alert will appear notifying that an email was sent to the rider.
   */
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

  /**
   *
   * @param currentRiderInfo
   * Gets the rider information to be displayed for the driver after they approve a request.
   */
  getRiderInfo(currentRiderInfo: User) {
    this.currentRiderInfo = currentRiderInfo;
  }
}
