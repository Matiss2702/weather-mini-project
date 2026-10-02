import { Component, input } from '@angular/core';

import { ZardCardImports } from '@/shared/components/card/card.imports';

@Component({
  selector: 'app-weather-stat-card',
  standalone: true,
  imports: [ZardCardImports],
  templateUrl: './weather-stat-card.html',
  styleUrl: './weather-stat-card.css',
})
export class WeatherStatCard {
  title = input.required<string>();

  value = input.required<string | number>();

  description = input<string>();
}
