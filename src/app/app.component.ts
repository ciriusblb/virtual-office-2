import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const url = 'https://virtual-office-d58a3.firebaseapp.com/ssr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'virtual-office by him';
  cities: any = [];
  _url: any = '';

  constructor(public http: HttpClient) {}
  ngOnInit() {
    this._url = url + '/contacts';
    console.log(this._url);
    this.http.get( this._url ).subscribe((resp: any) => {
      this.cities = Object.entries(resp.cities).map(e => Object.assign(e[1], { key: e[0] }));
      console.log('this.cities ', this.cities);
    });
  }
}
