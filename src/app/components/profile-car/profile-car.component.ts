import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-car',
  templateUrl: './profile-car.component.html',
  styleUrls: ['./profile-car.component.scss']
})
export class ProfileCarComponent implements OnInit {
  CarForm:FormGroup

  make: string;
  model:string;
  nrSeats:number;
  car: Car;
  success :string;

  constructor(private carService: CarService,private formBuilder: FormBuilder) {
    this.carService.getCarByUserId2(sessionStorage.getItem("userid")).subscribe((response)=>{
      console.log(response);
      this.car = response;

      
      this.CarForm = this.formBuilder.group({
        make: [this.car.make, Validators.required],
        model: [this.car.model, Validators.required],
        seats: [this.car.seats, Validators.required]
      });

    });
  }

  ngOnInit() {


  }

  updatesCarInfo(){
    //console.log(this.currentUser);
    console.log(this.car);
    if (this.CarForm.valid) {
    this.carService.updateCarInfo(this.car);
    this.success = "Updated Successfully!";
    } else {
      console.log("nope");
    }
  }

}
