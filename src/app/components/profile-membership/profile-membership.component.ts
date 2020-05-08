import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile-membership',
  templateUrl: './profile-membership.component.html',
  styleUrls: ['./profile-membership.component.scss'],
})
export class ProfileMembershipComponent implements OnInit {
  user: User;
  membershipForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.userService
      .getUserById2(sessionStorage.getItem('userid'))
      .subscribe((response) => {
        console.log(response);
        this.user = response;
        this.membershipForm = this.formBuilder.group({
          driver: [this.user.isDriver, Validators.required],
          active: [this.user.isActive, Validators.required],
        });
      });
  }
  updatesMembershipInfo() {
    this.userService.updateUserInfo(this.user);
  }
}
