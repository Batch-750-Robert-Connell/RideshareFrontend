import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Batch } from 'src/app/models/batch';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
// import { ValidationService } from 'src/app/services/validation-service/validation.service';
declare var $;
declare var Cleave;
declare var particlesJS;
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})

/**
 * HomePageComponent is the class with different properties to log in
 * and sign up. Some of the properties are username, password, email, and
 * all other personal information about the user. A user can also choose to
 * register as a driver or a rider.
 */
export class HomePageComponent implements OnInit {
  isAnime: boolean = true;
  isLogin = true;
  batches: Batch[];
  registerForm: FormGroup;
  loginForm: FormGroup;
  username: string;
  password: string;
  isWelcome = true;
  isLoginSuccess = false;
  isRegisterSuccess = false;
  isLoginFailure = false;
  @ViewChild("msgRegister",{static:false}) msgRegister:ElementRef;
  /**
   * instantiated the user.
   */
  user: User = {
    userId: 0,
    userName: '',
    password: '',
    batch: {
      batchNumber: 0,
      batchLocation: '',
    },
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    isActive: false,
    isDriver: false,
    active: false,
    driver: false,
    isAcceptingRides: false,
    hState: '',
    hAddress: '',
    hCity: '',
    hZip: null,
    wAddress: '',
    wCity: '',
    wState: '',
    wZip: null,
    emailVerified: false
  };

  constructor(
    private batchService: BatchService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private changeDetector : ChangeDetectorRef
  ) {
    /**
     * Animation on the homepage.
     */
    setTimeout(() => {
      this.isAnime = false;
    }, 1500);
    // gets a list of all the batch by their location.
    this.batchService.getAllBatchesByLocation1().subscribe((res) => {
      this.batches = res;
    });
    /**
     * registration form which requires some of the fields to be required using
     * form validation
     */
    this.registerForm = this.formBuilder.group({
      userId: [0],
      batch: [this.user.batch],
      userName: [this.user.userName, Validators.required],
      password: [this.user.password, Validators.required],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.email],
      phoneNumber: [
        this.user.phoneNumber,
        Validators.pattern(/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/),
      ],
      driver: [this.user.isDriver, Validators.required],
      hState: [this.user.hState, Validators.required],
      hAddress: [this.user.hAddress, Validators.required],
      hCity: [this.user.hCity, Validators.required],
      hZip: [this.user.hZip, Validators.required],
    });
    /**
     * login form which requires the username and password.
     */
    this.loginForm = this.formBuilder.group({
      username: [this.username, Validators.required],
      password: [this.password, Validators.required],
    });
  }

  /**
   * slides animation in the login page.
   */
  ngOnInit() {
    particlesJS.load(
      'background',
      'assets/particlesjs-config.json',
      function () {}
    );

    /**
     * animation slides on the log in page. 3 seconds between each slide.
     */
    setTimeout(() => {
      $('#slides').carousel({
        interval: 3000,
      });
    }, 3500);

  }
  /**
   * singUp function that users input their info to be stored in the database.
   */
  register() {
    this.registerForm.value.wAddress = this.registerForm.value.hAddress;
    this.registerForm.value.wCity = this.registerForm.value.hCity;
    this.registerForm.value.wState = this.registerForm.value.hState;
    this.registerForm.value.wZip = this.registerForm.value.hZip;
    console.log(this.registerForm);
    console.log(this.registerForm.valid);
    if (this.registerForm.valid) {
      this.userService.addUser(this.registerForm.value).subscribe((resp) => {
        this.MsgRegister();
        if(Object.keys(resp).length == 0) {
          this.msgRegister.nativeElement.innerHTML = "Thank you for choosing us "+this.user.firstName;
          this.isLogin = true;
        } else {
          this.msgRegister.nativeElement.innerHTML = resp[Object.keys(resp)[0]];
        }
        console.log(resp);
      });
    } else {
      this.MsgRegister();
      this.msgRegister.nativeElement.innerHTML = "please fill out the form";
    }
  }
  /**
   * logIn function is used to verify credentials of the users to log them in
   * into their personal accounts. If credentials are verified, the user will get
   * a welcome message, if not, then they will get a failure message.
   */
  login() {
    if (this.loginForm.valid) {
      this.authService.authMe(this.username, this.password).then((resp) => {
        if (resp['userid'] != undefined) {
          setTimeout(() => {
            sessionStorage.setItem('userid', resp['userid'][0]);
            this.router.navigate(['/landingPage']);
          }, 2000);
          this.successLogin();
        } else {
          this.failureLogin();
        }
      });
    }
  }
  // when credentials are verifired, this fucntion is called and produces the success message.
  successLogin() {
    this.isWelcome = false;
    this.isLoginSuccess = true;
    this.isRegisterSuccess = false;
    this.isLoginFailure = false;
  }
  // when credentials are not verified, this fucntion is called and produces the failure message.
  failureLogin() {
    this.isWelcome = false;
    this.isLoginSuccess = false;
    this.isRegisterSuccess = false;
    this.isLoginFailure = true;
  }
  // this fucntion is called when registration is successful.
  MsgRegister() {
    this.isWelcome = false;
    this.isLoginSuccess = false;
    this.isRegisterSuccess = true;
    this.isLoginFailure = false;
    this.changeDetector.detectChanges();
  }

  /**
   * this function is called when a user clicks the signUp button. It toggles between the
   * logIn and the signup form. When a user completes the registration, this function is called
   * again to take them back to the logIn page.
   */
  toggle() {
    this.isLogin = !this.isLogin;
    if (!this.isLogin) {
      setTimeout(() => {
        new Cleave('#phone', {
          phone: true,
          phoneRegionCode: 'us',
          delimiter: '-',
        });
      }, 1000);
    }
  }
}
