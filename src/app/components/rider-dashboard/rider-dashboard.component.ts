import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation-service/reservation.service';
import { Reservation } from '../../models/reservation';
import { CarService } from '../../services/car-service/car.service';
import { Car } from '../../models/car';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-rider-dashboard',
  templateUrl: './rider-dashboard.component.html',
  styleUrls: ['./rider-dashboard.component.css'],
})
export class RiderDashboardComponent implements OnInit {
  riderRequest: Reservation[] = [];
  driverCar: Car;
  driverUser: User;
  CSS_COLOR_NAMES: Array<string> = [
    'AliceBlue',
    'AntiqueWhite',
    'Aqua',
    'Aquamarine',
    'Azure',
    'Beige',
    'Bisque',
    'Black',
    'BlanchedAlmond',
    'Blue',
    'BlueViolet',
    'Brown',
    'BurlyWood',
    'CadetBlue',
    'Chartreuse',
    'Chocolate',
    'Coral',
    'CornflowerBlue',
    'Cornsilk',
    'Crimson',
    'Cyan',
    'DarkBlue',
    'DarkCyan',
    'DarkGoldenRod',
    'DarkGray',
    'DarkGrey',
    'DarkGreen',
    'DarkKhaki',
    'DarkMagenta',
    'DarkOliveGreen',
    'DarkOrange',
    'DarkOrchid',
    'DarkRed',
    'DarkSalmon',
    'DarkSeaGreen',
    'DarkSlateBlue',
    'DarkSlateGray',
    'DarkSlateGrey',
    'DarkTurquoise',
    'DarkViolet',
    'DeepPink',
    'DeepSkyBlue',
    'DimGray',
    'DimGrey',
    'DodgerBlue',
    'FireBrick',
    'FloralWhite',
    'ForestGreen',
    'Fuchsia',
    'Gainsboro',
    'GhostWhite',
    'Gold',
    'GoldenRod',
    'Gray',
    'Grey',
    'Green',
    'GreenYellow',
    'HoneyDew',
    'HotPink',
    'IndianRed',
    'Indigo',
    'Ivory',
    'Khaki',
    'Lavender',
    'LavenderBlush',
    'LawnGreen',
    'LemonChiffon',
    'LightBlue',
    'LightCoral',
    'LightCyan',
    'LightGoldenRodYellow',
    'LightGray',
    'LightGrey',
    'LightGreen',
    'LightPink',
    'LightSalmon',
    'LightSeaGreen',
    'LightSkyBlue',
    'LightSlateGray',
    'LightSlateGrey',
    'LightSteelBlue',
    'LightYellow',
    'Lime',
    'LimeGreen',
    'Linen',
    'Magenta',
    'Maroon',
    'MediumAquaMarine',
    'MediumBlue',
    'MediumOrchid',
    'MediumPurple',
    'MediumSeaGreen',
    'MediumSlateBlue',
    'MediumSpringGreen',
    'MediumTurquoise',
    'MediumVioletRed',
    'MidnightBlue',
    'MintCream',
    'MistyRose',
    'Moccasin',
    'NavajoWhite',
    'Navy',
    'OldLace',
    'Olive',
    'OliveDrab',
    'Orange',
    'OrangeRed',
    'Orchid',
    'PaleGoldenRod',
    'PaleGreen',
    'PaleTurquoise',
    'PaleVioletRed',
    'PapayaWhip',
    'PeachPuff',
    'Peru',
    'Pink',
    'Plum',
    'PowderBlue',
    'Purple',
    'RebeccaPurple',
    'Red',
    'RosyBrown',
    'RoyalBlue',
    'SaddleBrown',
    'Salmon',
    'SandyBrown',
    'SeaGreen',
    'SeaShell',
    'Sienna',
    'Silver',
    'SkyBlue',
    'SlateBlue',
    'SlateGray',
    'SlateGrey',
    'Snow',
    'SpringGreen',
    'SteelBlue',
    'Tan',
    'Teal',
    'Thistle',
    'Tomato',
    'Turquoise',
    'Violet',
    'Wheat',
    'White',
    'WhiteSmoke',
    'Yellow',
    'YellowGreen',
  ];
  color: string = 'orange';

  Modal: boolean = false;

  constructor(
    private carService: CarService,
    private reservationService: ReservationService
  ) {}
  ngOnInit() {
    this.getReservations();
  }

  getReservations() {
    let id = parseInt(sessionStorage.getItem('userid'));
    this.reservationService
      .getAllReservationsByRiderID(id)
      .then((data) => {
        if (data != null) {
          this.riderRequest = data;
          console.log(this.riderRequest);
          this.color = this.driverCar.color;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  showModal() {
    console.log(this.Modal + ' Hello From showModal');
    this.Modal = !this.Modal;
  }
  getCarInfo(driver: User) {
    //let driverIdNumber = parseInt(driverId);

    console.log(driver);
    this.driverUser = driver;

    this.carService
      .getCarByUserId(driver.userId)
      .then((data) => {
        this.driverCar = data;

        this.color = this.CSS_COLOR_NAMES.includes(this.driverCar.color)
          ? this.driverCar.color
          : 'orange';
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
