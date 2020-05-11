import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var Cleave;
@Component({
  selector: 'app-profile-contact',
  templateUrl: './profile-contact.component.html',
  styleUrls: ['./profile-contact.component.scss']
})
/**
 * ProfileContactComponent works with the contact information of each user.
 */
export class ProfileContactComponent implements OnInit {
  profilForm: FormGroup;
  user : User;

  constructor(private router: Router, private userService: UserService,private formBuilder: FormBuilder,private snackBar: MatSnackBar) {
    this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.user = response;
      /**
       * profilForm is what the user uses to enter thier information while updating their profile.
       * It uses validation to make sure all fields are filled by the user.
       */

      this.profilForm = this.formBuilder.group({
        firstName: [this.user.firstName, Validators.required],
        lastName: [this.user.lastName, Validators.required],
        email: [this.user.email, Validators.email],
        phone: [this.user.phoneNumber, Validators.pattern(/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/)]
      });

    });



  }


  ngOnInit(){
    setTimeout(() => {
      //phone format when user enters their phone number.
      new Cleave('#phone', {
        phone: true,
        phoneRegionCode: 'us',
        delimiter: '-'
    });
    }, 1000);
  }
  /**
   * updatesContactInfo is used to update the information of each contact. It uses
   * validation to make sure that all the fields are required.
   */
  updatesContactInfo(){
    console.log("ok");
    console.log(this.profilForm);
    if (this.profilForm.valid) {
      console.log(this.user);
      console.log(this.profilForm.value);
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
