import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation-service/validation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var Cleave;
@Component({
  selector: 'app-profile-contact',
  templateUrl: './profile-contact.component.html',
  styleUrls: ['./profile-contact.component.scss']
})
export class ProfileContactComponent implements OnInit {
  profilForm: FormGroup;
  user : User;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  success :string;
  failure: string;
  constructor(private router: Router, private userService: UserService,private formBuilder: FormBuilder,private snackBar: MatSnackBar) {
    this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.user = response;
      this.profilForm = this.formBuilder.group({
        firstName: [this.user.firstName, Validators.required],
        lastName: [this.user.lastName, Validators.required],
        email: [this.user.email, Validators.email],
        phone: [this.user.phoneNumber, Validators.pattern(/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/)]
      });
      var cleave = new Cleave('#phone', {
        phone: true,
        phoneRegionCode: 'us',
        delimiter: '-'
    });
    });



  }

  ngOnInit() {


  }

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
