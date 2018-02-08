import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router, RouterModule, RouterLink} from '@angular/router';

import {ApiService} from "../../services/api/api.service";

import {SearchModel} from "../../services/models/search.model";
import {SearchService} from "../../services/search.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public model: any;
  public locationGroup: FormGroup;
  public invalid: boolean = false;
  public disabled: boolean = true;

  constructor(private apiService: ApiService, private fb: FormBuilder, private router: Router, private searchService: SearchService) {
    this.model = new SearchModel('');
  }

  ngOnInit()  {
    this.locationGroup = this.fb.group({
      inputLocation: ['']
    });
  }

  isDisabled(e) {
    if (e.value.inputLocation.length === 0) {
      return true;
    }
  }

  search(e) {
    this.model.location = e.value.inputLocation;

    this.searchService.location = this.model.location;

    //GET LOCATION
    this.apiService.getCurrentLocation(this.model).subscribe(data => {
        this.router.navigate([`/forecast/${this.model.location}`]);
        this.invalid = false;
      },
      err => {
        this.invalid = true;
        console.log(err.message);
      });

  }

}
