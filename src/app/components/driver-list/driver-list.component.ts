import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar
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
                color: '#3e3e3e',
              },
            ],
          },
          {
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#cecece',
              },
              {
                weight: 0.5,
              },
            ],
          },
          {
            elementType: 'labels.text.stroke',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'administrative',
            elementType: 'labels.text',
            stylers: [
              {
                color: '#dbdbdb',
              },
            ],
          },
          {
            featureType: 'administrative.land_parcel',
            stylers: [
              {
                color: '#757575',
              },
            ],
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#dcd2be',
              },
            ],
          },
          {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [
              {
                color: '#313131',
              },
            ],
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              {
                color: '#053203',
              },
            ],
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#ffffff',
              },
            ],
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [
              {
                color: '#022600',
              },
            ],
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#99be98',
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#0092df',
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [
              {
                color: '#fdfcf8',
              },
            ],
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#0bc8ff',
              },
            ],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
              {
                color: '#00c4ce',
              },
            ],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#00dadf',
              },
            ],
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [
              {
                color: '#00a4a8',
              },
            ],
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#0bfff9',
              },
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'road.local',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#a6a6a6',
              },
            ],
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#c0c0c0',
              },
            ],
          },
          {
            featureType: 'transit',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#ff0b11',
              },
            ],
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [
              {
                color: '#808080',
              },
            ],
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#8f7d77',
              },
            ],
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                color: '#ebe3cd',
              },
            ],
          },
          {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [
              {
                color: '#808080',
              },
            ],
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#ff6000',
              },
            ],
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#92998d',
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
  }
}
