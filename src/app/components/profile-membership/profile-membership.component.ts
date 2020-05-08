import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { Batch } from 'src/app/models/batch';
@Component({
  selector: 'app-profile-membership',
  templateUrl: './profile-membership.component.html',
  styleUrls: ['./profile-membership.component.scss']
})
export class ProfileMembershipComponent implements OnInit {
  user : User;
  batches:Batch[];
  membershipForm:FormGroup

  constructor(private userService: UserService,private formBuilder: FormBuilder,private snackBar:MatSnackBar,private batchService:BatchService) {
    this.getAllBatches();
  }
  ngOnInit() {
    
    this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
      console.log(response);
      this.user = response;
      this.membershipForm = this.formBuilder.group({
        driver: [this.user.driver, Validators.required],
        active: [this.user.active, Validators.required],
        batch: [this.user.batch, Validators.required]
      });
    });
  }
  updatesMembershipInfo(){
    if(this.membershipForm.valid){
      this.userService.updateUserInfo(this.user);
      this.snackBar.open("success", "", {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['success']
      });
    } else {
      this.snackBar.open("failure", "", {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['failure']
      });
    }
  }

  getAllBatches(){
    this.batchService.getAllBatchesByLocation1().subscribe(
      res => {
         this.batches = res;
         console.log(this.batches);
          },
      );
  }
}
