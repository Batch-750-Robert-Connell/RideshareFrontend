import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile-car',
  templateUrl: './profile-car.component.html',
  styleUrls: ['./profile-car.component.scss'],
})
/**
 * ProfileCarComponent allows a user to update and modify their car information such as
 * make, mode, and number of seats.
 */
export class ProfileCarComponent implements OnInit {
  CarForm: FormGroup;

  make: string;
  model: string;
  nrSeats: number;
  car: Car;
  success: string;
  isNew: boolean;
  userInfo: User;

  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.carService
      .getCarByUserId2(sessionStorage.getItem('userid'))
      .subscribe((response) => {
        if (response == null) {
          this.isNew = true;
          this.userService
            .getUserById(Number.parseInt(sessionStorage.getItem('userid')))
            .then((userInfo) => {
              this.userInfo = userInfo;

              /**
               * Instatiate the current year when there is no information about the
               * car. This is the default setting for the car information. Other car information
               * are set to empty for the user to modify and update based on their car information.
               */
              var d = new Date();
              var year = d.getFullYear();
              this.car = {
                make: '',
                model: '',
                seats: 1,
                carId: 0,
                color: '',
                user: userInfo,
                year: year,
              };


              /**
               * This is the form where user has to fill the information about their car. This is used for
               * form validation. These fields are required to be filled by the user upon registering their car.
               */
              this.CarForm = this.formBuilder.group({
                make: ['', Validators.required],
                model: ['', Validators.required],
                seats: ['', Validators.required],
                color: ['', Validators.required],
                year: [0, Validators.required],
              });
            });
        } else {
          this.isNew = false;
          this.car = response;

          this.CarForm = this.formBuilder.group({
            make: [this.car.make, Validators.required],
            model: [this.car.model, Validators.required],
            seats: [this.car.seats, Validators.required],
            color: [this.car.color, Validators.required],
            year: [this.car.year, Validators.required],
          });
        }
      });
  }

  ngOnInit() {}

  /**
   * this funtion is executed when the user inputs new information for their car.
   */
  createNewCar() {
    if (this.CarForm.valid) {
      this.car.make = this.CarForm.value.make;
      this.car.model = this.CarForm.value.model;
      this.car.seats = this.CarForm.value.seats;
      this.carService.createCar(this.car, sessionStorage.getItem('userid'));
      this.success = 'Updated Successfully!';
      this.snackBar.open('success', '', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['success'],
      });
    } else {
      console.log('nope');
      this.snackBar.open('success', '', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['success'],
      });
    }
  }

/**
 * This funtion is executed when a user updates their car information. For example when they buy
 * a new car.
 */
  updatesCarInfo() {
    if (this.CarForm.valid) {
      this.carService.updateCarInfo(this.car);
      this.success = 'Updated Successfully!';
      this.snackBar.open('success', '', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['success'],
      });
    } else {
      console.log('nope');
      this.snackBar.open('success', '', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['success'],
      });
    }
  }
}
