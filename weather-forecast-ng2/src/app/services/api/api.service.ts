import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {SearchModel} from "../models/search.model";

const baseUrl = "http://api.apixu.com/v1"; // BASE URL;

const current = '/current.json?key=29d83fa2298a47d29bb121845161212&q=';
const forecast = '/forecast.json?key=29d83fa2298a47d29bb121845161212&q=';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {

  }

  getCurrentLocation(searchModel: SearchModel) {
    return this.http.get(
      baseUrl + current + searchModel.location,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  getForecastIn48h(searchModel: SearchModel) {

    return this.http.get(
      baseUrl + forecast + searchModel.location  + `&days=6` +`&hour=5`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }


}
