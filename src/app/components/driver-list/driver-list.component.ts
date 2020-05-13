import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MapsAPILoader } from '@agm/core';
declare var google;
@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css'],
})

/**
 * DriverListComponent has the properties related to the drivers. These prpoerties
 * include the available cars?, the drivers, which are the application users that are registered
 * as drivers, googleDrivers which are listed and sorted with respect to distance. IdOfDriver and IdOfUser
 * are user for us to be able to send a ride request via email from a specific user to he driver of their choice.
 *
 */
export class DriverListComponent implements OnInit {
  location = 'Morgantown, WV';
  mapProperties: {};
  availableCars: Array<any> = [];
  drivers: Array<any> = [];
  googleDrivers: Array<any> = [];
  IdOfDriver: number;
  IdOfUser: number;

  @ViewChild('map', null) mapElement: any;
  map: google.maps.Map;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private mapsAPILoader: MapsAPILoader
  ) {}

  /**
   * ngOnInit() gets the drivers from our database and adds them to our drivers array.
   */

  ngOnInit() {
    this.drivers = [];
    this.googleDrivers = [];

    this.userService.getRidersForLocation1(this.location).subscribe((res) => {
      res.forEach((element) => {
        this.drivers.push({
          id: element.userId,
          name: element.firstName,
          origin: element.hCity + ',' + element.hState,
          email: element.email,
          phone: element.phoneNumber,
        });
      });
    });

    // shows the map on the drivers page
    this.sleep(2000).then(() => {
      this.mapProperties = {
        center: new google.maps.LatLng(
          Number(sessionStorage.getItem('lat')),
          Number(sessionStorage.getItem('lng'))
        ),
        styles: [
          {
            elementType: 'geometry',
            stylers: [
              {
                color: '#1E2733',
              },
            ],
          },
          {
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#FFE09F',
              },
            ],
          },
          {
            elementType: 'labels.text.stroke',
            stylers: [
              {
                color: '#242F3E',
              },
            ],
          },
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#ECD0B9',
              },
            ],
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#F2DECE',
              },
            ],
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [
              {
                color: '#015C05',
              },
            ],
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#F7FDBD',
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
              {
                color: '#FD8806',
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#9CA5B3',
              },
            ],
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [
              {
                color: '#B97400',
              },
            ],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
              {
                color: '#CA4B00',
              },
            ],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#1F2835',
              },
            ],
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#F3D19C',
              },
            ],
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [
              {
                color: '#E63F00',
              },
            ],
          },
          {
            featureType: 'road.local',
            elementType: 'geometry',
            stylers: [
              {
                color: '#979797',
              },
            ],
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [
              {
                color: '#2F3948',
              },
            ],
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#D59563',
              },
            ],
          },
          {
            featureType: 'transit.station.airport',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#ECD0B9',
              },
            ],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
              {
                color: '#00D2DD',
              },
            ],
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#434D5A',
              },
            ],
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                color: '#17263C',
              },
            ],
          },
        ],
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };
      this.map = new google.maps.Map(
        this.mapElement.nativeElement,
        this.mapProperties
      );
      
      // get all routes
      this.displayDriversList(this.location, this.drivers);
      // show drivers on map
      this.showDriversOnMap(this.location, this.drivers);


    });
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * showDriversOnMap will show the user where each driver is located on the map
   * as well as displaying the route from the location.
   */

  showDriversOnMap(origin, drivers) {
    this.mapsAPILoader.load().then(() => {
      drivers.forEach((element) => {
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
          draggable: true,
          map: this.map,
        });
        this.displayRoute(
          origin,
          element.origin,
          directionsService,
          directionsRenderer
        );
      });
    });

  }
  /**
   * User requests for a desired driver from the driver's List table
   *
   * @param driverId
   * @param driver
   * submitRequest() will send a request email to the driver from the specific
   * user who is logged in. After the user is clickes the request button, a confirmation
   * message will appear for 2 seconds stating that the request has been sent to the specific
   * driver chosen.
   */
  submitRequest(driverId: string, driver: string) {
    const parseDriverId = parseInt(driverId);
    const userId = parseInt(sessionStorage.getItem('userid'));
    this.userService
      .sendEmail(userId, parseDriverId)
      .then((data) => {
        console.log(data);
        this.snackBar.open('Request has been sent to ' + driver, '', {
          duration: 2000,
          direction: 'ltr',
          politeness: 'assertive',
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['success'],
        });
      })
      .catch((error) => {
        this.snackBar.open('Request has failed', '', {
          duration: 2000,
          direction: 'ltr',
          politeness: 'assertive',
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['failure'],
        });
      });
  }

  /**
   *
   * @param origin
   * @param destination
   * @param service
   * @param display
   * displayRoute() will display the Route on the map for the user to view. If there was
   * an error and the route is not displayed, an alert will notify the user with a status code.
   */
  displayRoute(origin, destination, service, display) {
    service.route(
      {
        origin,
        destination,
        travelMode: 'DRIVING',
        // avoidTolls: true
      },
      (response, status) => {
        if (status === 'OK') {
          display.setDirections(response);
        } else {
          alert('Could not display directions due to: ' + status);
        }
      }
    );
  }

  /**
   *
   * @param origin
   * @param drivers
   * displayDriverList will display the dirvers with the distance and time needed
   * in the table on the drivers page. if the user who is logged in is a driver, their
   * name will not be displayed because they can't request a ride from themselves. The data
   * in this list is sorted by distance, so the closest driver to the user will be displayed on
   * top of the list.
   */

  displayDriversList(origin, drivers) {
    this.mapsAPILoader.load().then(() => {
      const origins = [];
      // set origin
      origins.push(origin);
      drivers.forEach((element) => {
        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins,
            destinations: [element.origin],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: false,
          },
  
          (response, status) => {
            if (status !== 'OK') {
              alert('Error was: ' + status);
            } else {
              var originList = response.originAddresses;
              var destinationList = response.destinationAddresses;
              let results = response.rows[0].elements;
  
              const name = element.name;
  
              const myobj = {
                Id: element.id,
                Name: name,
                Distance: results[0].distance.text,
                Duration: results[0].duration.text,
              };
  
              // driver won't be able to view himself in the driversList.
              if (myobj.Id != sessionStorage.getItem('userid')) {
                this.googleDrivers.push(myobj);
              }
              // sorting the drivers list by distance
              this.googleDrivers.sort((a, b) =>
                parseFloat(a.Distance.split()[0]) >
                parseFloat(b.Distance.split()[0])
                  ? 1
                  : -1
              );
            }
          }
        );
      });
    });

  }
}
