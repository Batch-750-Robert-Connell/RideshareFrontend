import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
    $('#slides').carousel({
      interval: 3000
    });
  }



}
