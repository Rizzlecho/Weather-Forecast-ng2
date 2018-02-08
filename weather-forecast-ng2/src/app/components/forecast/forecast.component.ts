import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {SearchModel} from "../../services/models/search.model";

import {ApiService} from "../../services/api/api.service";
import {SearchService} from "../../services/search.service";


@Component({
  selector: 'app-header',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class HeaderComponent implements OnInit {

  public model: any;

  public location: string;

  public cityMain: boolean = true;
  public showToday: boolean = true;
  public show48h: boolean = false;
  public show48hMobile: boolean = false;

  public name: string;
  public localtimeAndDate: string;
  public condition: string;
  public temp: string;
  public icon: string;
  public feelsLike: string;
  public humidity: string;
  public wind: string;
  public localtime: string;

  public dateIn48h: string;
  public iconIn48h: string;
  public tempIn48h: string;
  public conditionIn48h: string;

  public nextDaysArr;


  constructor(private apiService: ApiService, private searchService: SearchService, private route: ActivatedRoute) {
    this.model = new SearchModel('');
  }

  ngOnInit() {
    this.location = this.route.snapshot.paramMap.get('location');

    this.model.location = this.location;

    //GET LOCATION
    this.apiService.getCurrentLocation(this.model).subscribe(data => {

        this.name = data['location'].name;
        this.localtimeAndDate = data['location'].localtime;
        this.condition = data['current']['condition'].text;
        this.icon = data['current']['condition'].icon;
        this.temp = data['current'].temp_c;
        this.humidity = data['current'].humidity;
        this.feelsLike = data['current'].feelslike_c;
        this.wind = data['current'].wind_kph;

        this.localtime = this.localtimeAndDate.slice(this.localtimeAndDate.length - 5, this.localtimeAndDate.length).trim();
        this.showToday = true;
        this.show48h = false;
      },
      err => {
        console.log(err.message);
      });

    this.apiService.getForecastIn48h(this.model).subscribe(data => {
        let arrForecast = [];
        let forecastObj = {};

        for (let obj of data['forecast']['forecastday']) {
          // console.log(obj);
          forecastObj = {
            'dateIn48h': obj.date,
            'iconIn48h': obj['day']['condition'].icon,
            'conditionIn48h': obj['day']['condition'].text,
            'tempIn48h': obj['day'].avgtemp_c
          };

          arrForecast.push(forecastObj)
        }
        this.nextDaysArr = arrForecast;

      },
      err => {
        console.log(err.message);
      });

  }


  render48h() {
    this.showToday = false;
    this.show48h = true;
  }

  renderToday() {
    this.showToday = true;
    this.show48h = false;
  }

  render48Mobile() {
    this.showToday = false;
    this.show48h = false;
    this.cityMain = false;
    this.show48hMobile = true;
  }

  isDisabledToday() {
    if (this.showToday) return true;
  }

  isDisabled48h() {
    if (this.show48h) return true;
  }

}
