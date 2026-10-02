import { Component, input } from '@angular/core';

import { ZardBadgeComponent } from '@/shared/components/badge';

@Component({
  selector: 'app-weather-header',
  standalone: true,
  imports: [ZardBadgeComponent],
  templateUrl: './weather-header.html',
  styleUrl: './weather-header.css',
})
export class WeatherHeader {
  city = input.required<string>();

  latitude = input.required<number>();

  longitude = input.required<number>();
}
