import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-driver-request-manager',
  templateUrl: './driver-request-manager.component.html',
  styleUrls: ['./driver-request-manager.component.css'],
})
export class DriverRequestManagerComponent implements OnInit {
  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {}

  approveRequest() {
    this.snackBar.open(
      'Sending Email to let NAME know you will be picking them up soon. ',
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
  }

  denyRequest() {
    this.snackBar.open('Request Denied.  ', '', {
      duration: 2000,
      direction: 'ltr',
      politeness: 'assertive',
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['fail'],
    });
  }
}
