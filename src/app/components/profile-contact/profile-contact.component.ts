import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation-service/validation.service';

@Component({
  selector: 'app-profile-contact',
  templateUrl: './profile-contact.component.html',
  styleUrls: ['./profile-contact.component.css']
})
export class ProfileContactComponent implements OnInit {
  profilForm: FormGroup;
  profileObject : User;
  currentUser: any = '';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  success :string;
  failure: string;
  constructor(private router: Router, private userService: UserService,private formBuilder: FormBuilder) {
    this.currentUser = this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.profileObject = response;
      this.firstName = this.profileObject.firstName;
      this.lastName = this.profileObject.lastName;
      this.email = this.profileObject.email;
      this.phone = this.profileObject.phoneNumber;



    });

  }

  ngOnInit() {

    this.profilForm = this.formBuilder.group({
      firstName: [this.firstName, Validators.required],
      lastName: [this.lastName, Validators.required],
      email: [this.email, Validators.email],
      phone: [this.phone, Validators.pattern(/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/)]

    });
  }

  updatesContactInfo(){
    console.log("ok");
    console.log(this.profilForm);
    if (this.profilForm.valid) {
      this.userService.updateUserInfo(this.profileObject);
      this.success = "Updated Successfully!";
      this.failure = "";
    } else {
      console.log("nope");
      this.failure = "you can't do that !";
      this.success = "";
    }

  }


}
