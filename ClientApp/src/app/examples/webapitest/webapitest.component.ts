import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-webapitest',
  templateUrl: './webapitest.component.html',
  styleUrls: ['./webapitest.component.css']
})
export class WebapitestComponent implements OnInit {
  public forecasts: WeatherForecast[];

  constructor(http: HttpClient) {
    http.get<WeatherForecast[]>('/api/SampleData/WeatherForecasts').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }

  ngOnInit() {
  }

}

interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
