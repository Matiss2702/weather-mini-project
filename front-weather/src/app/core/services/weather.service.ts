import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Weather } from '../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly http = inject(HttpClient);

  getWeatherByCity(city: string): Observable<Weather> {
    return this.http.get<Weather>(`/api/weathers/${encodeURIComponent(city)}`);
  }
}
