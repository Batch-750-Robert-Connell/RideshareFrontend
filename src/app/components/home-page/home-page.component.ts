import { Component, OnInit } from '@angular/core';
import { Batch } from 'src/app/models/batch';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  isLogin:boolean = true;
  batches:Batch[];
  registerForm:FormGroup;
  loginForm:FormGroup;
  username:string;
  password:string;
  user:User = {
    userId:0,
    userName: "",
    password: "",
    batch:{
      batchNumber:0,
      batchLocation:''
    },
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    active: false,
    driver: false,
    isAcceptingRides:false ,
    hState: "",
    hAddress: "",
    hCity: "",
    hZip: null,
    wAddress: "",
    wCity: "",
    wState: "",
    wZip: null,
  }

  constructor(private batchService:BatchService, private formBuilder:FormBuilder,private authService:AuthService,private router:Router) {
    this.batchService.getAllBatchesByLocation1().subscribe(
      res => {
         this.batches = res;
         console.log(this.batches);
          },
      );
      this.registerForm =this.formBuilder.group({
        userId: [0],
        batch: [this.user.batch],
        userName: [this.user.userName, Validators.required],
        password: [this.user.password, Validators.required],
        firstName: [this.user.firstName, Validators.required],
        lastName: [this.user.lastName, Validators.required],
        email: [this.user.email, Validators.required],
        phoneNumber: [this.user.phoneNumber, Validators.required],
        driver: [true, Validators.required],
        hState: [this.user.hState, Validators.required],
        hAddress: [this.user.hAddress, Validators.required],
        hCity: [this.user.hCity, Validators.required],
        hZip: [this.user.hZip, Validators.required],
      });

      this.loginForm =this.formBuilder.group({
        username: [this.username, Validators.required],
        password: [this.password, Validators.required],
      });
  }
  

  ngOnInit() {
    $('#slides').carousel({
      interval: 3000
    });
  }

  register(){
    this.registerForm.value.wAddress = this.registerForm.value.hAddress;
    this.registerForm.value.wCity = this.registerForm.value.hCity;
    this.registerForm.value.wState = this.registerForm.value.hState;
    this.registerForm.value.wZip = this.registerForm.value.hZip;

    console.log(this.registerForm.value);
  }

  login() {
    if(this.loginForm.valid) {
      this.authService.authMe(this.username,this.password).then((resp)=>{
      console.log(resp);
      if(resp["userid"] != undefined){
        sessionStorage.setItem("userid",resp["userid"][0]);
        this.router.navigate(["/landingPage"]);
      }
    });
  }
	}


  toggle(){
    this.isLogin = !this.isLogin;
    console.log(this.isLogin);
  }







}
