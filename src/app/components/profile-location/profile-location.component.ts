import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.scss']
})
export class ProfileLocationComponent implements OnInit {
  locationForm:FormGroup
  user:User;

  constructor(private userService: UserService,private formBuilder: FormBuilder,private snackBar: MatSnackBar) { }

  ngOnInit() {

   this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
     console.log(response);
      this.user = response;

      this.locationForm = this.formBuilder.group({
        address: [this.user.hAddress, Validators.required],
        city: [this.user.wCity, Validators.required],
        state: [this.user.hState, Validators.required],
        zipcode: [this.user.hZip, Validators.required]
      });

    });
  }

  updatesContactInfo(){

    //console.log(this.currentUser);
   console.log(this.user);
    if (this.locationForm.valid) {
      this.userService.updateUserInfo(this.user);
      this.snackBar.open("success", "", {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['success']
      });
    } else {
      console.log("nope");
      this.snackBar.open("failure", "", {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['failure']
      });

    }
   
  }
}
