import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-car',
  templateUrl: './profile-car.component.html',
  styleUrls: ['./profile-car.component.scss'],
})
export class ProfileCarComponent implements OnInit {
  CarForm: FormGroup;

  make: string;
  model: string;
  nrSeats: number;
  car: Car;
  success: string;

  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.carService
      .getCarByUserId2(sessionStorage.getItem('userid'))
      .subscribe((response) => {
        console.log(response);
        /**
         * CarForm is used to change the information abou the car that the user is driving. It
         * uses validation to ake sure that all fields are filled.
         */
        this.CarForm = this.formBuilder.group({
          make: [this.car.make, Validators.required],
          model: [this.car.model, Validators.required],
          seats: [this.car.seats, Validators.required],
        });
      });
  }

  ngOnInit() {}
  /**
   * updates can information such as number of seats, make, and model.
   */
  updatesCarInfo() {
    console.log(this.car);
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
