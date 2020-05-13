import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Reservation } from 'src/app/models/reservation';
@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  urlReservation: string = environment.reservationUri;
  urlApproveRes: string = environment.approveRequestUri;
  urlDenyRes: String = environment.deniedRequestUri;
  constructor(private http: HttpClient) {}

  getAllReservationsByDriverID<Promise>(id: number) {
    return this.http
      .get<Reservation[]>(`${this.urlReservation}/driver?id=${id}`)
      .toPromise();
  }

  getAllReservationsByRiderID(id: number): Promise<any> {
    return this.http
      .get<Reservation[]>(`${this.urlReservation}/rider?id=${id}`)
      .toPromise();
  }

  approveReservation(
    riderId: string,
    driverId: string,
    reservationId: string
  ): Promise<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );
    return this.http
      .get(
        `${this.urlApproveRes}?User_Id=${riderId}&Driver_Id=${driverId}&Reservation_Id=${reservationId}`,
        {
          headers,
          responseType: 'text',
        }
      )
      .toPromise();
  }

  denyReservation(riderId: string, reservationId: string): Promise<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );
    return this.http
      .get(`${this.urlDenyRes}?id=${riderId}&Reservation_Id=${reservationId}`, {
        headers,
        responseType: 'text',
      })
      .toPromise();
  }
}
