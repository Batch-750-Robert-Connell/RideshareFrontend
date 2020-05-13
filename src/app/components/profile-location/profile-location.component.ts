import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.scss'],
})
export class ProfileLocationComponent implements OnInit {
  locationForm: FormGroup;
  user: User;
  searchedPlace: string = "";
  @ViewChild("addresstext", {static: false}) addresstext: ElementRef;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader
  ) {}

  ngOnInit() {
    this.userService
      .getUserById2(sessionStorage.getItem('userid'))
      .subscribe((response) => {
        this.user = response;
        /**
         * locationForm is used by the user to enter their location inforation, It uses
         * validation to ensure that all fields are filled when updating the info.
         */
        this.locationForm = this.formBuilder.group({
          address: [this.user.hAddress, Validators.required],
          city: [this.user.hCity, Validators.required],
          state: [this.user.hState, Validators.required],
          zipcode: [this.user.hZip, Validators.required],
        });
      });

      


         
    //load Places Autocomplete

  }

  ngAfterViewInit(){
    this.findAdress();
  }


  findAdress(){

    console.log(this.addresstext);
    this.mapsAPILoader.load().then(() => {
         let autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement);
         autocomplete.addListener("place_changed", () => {
           this.ngZone.run(() => {
             // some details
             let place: google.maps.places.PlaceResult = autocomplete.getPlace();
             console.log(place);
            this.user.hAddress = "";
            this.user.hCity = "";
            this.user.hState = "";
            this.user.wZip = 0;
             place.address_components.forEach((ele)=>{
              switch (ele.types[0]) {
                case "street_number":
                  this.user.hAddress += ele.long_name+" "
                  break;
                case "route":
                    this.user.hAddress += ele.long_name+" "
                break;
                case "route":
                    this.user.hAddress += ele.long_name+" "
                break;
                case "locality":
                  this.user.hCity += ele.long_name
                break;
                case "administrative_area_level_1":
                  this.user.hState += ele.short_name
                break;
                case "postal_code":
                  this.user.wZip += Number.parseInt(ele.long_name)
                break;
                default:
                  break;
              }
             })
           

             //  this.address = place.formatted_address;
            //  this.web_site = place.website;
            //  this.name = place.name;
            //  this.zip_code = place.address_components[place.address_components.length - 1].long_name;
            //  //set latitude, longitude and zoom
            //  this.latitude = place.geometry.location.lat();
            //  this.longitude = place.geometry.location.lng();
            //  this.zoom = 12;
           });
         });
       });
   }

 


  
  /**
   * updates the location of the user.
   */
  updatesContactInfo() {
    if (this.locationForm.valid) {
      this.userService.updateUserInfo(this.user).then(resp=>{
        this.snackBar.open('success', '', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['success'],
        });
      }).catch((error)=>{
        console.log(error);
        console.log('nope');
        this.snackBar.open('failure', '', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['failure'],
        });
      });

    } else {
      this.snackBar.open('failure', '', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['failure'],
      });
    }
  }
}
