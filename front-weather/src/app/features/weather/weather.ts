import { Component, OnInit, inject, signal } from '@angular/core';

import { ActivatedRoute, RouterLink } from '@angular/router';

import { WeatherService } from '../../core/services/weather.service';
import { Weather as WeatherModel } from '../../core/models/weather.model';

import { WeatherHeader } from './components/weather-header/weather-header';
import { WeatherStatCard } from './components/weather-stat-card/weather-stat-card';

import { ZardButtonComponent } from '@/shared/components/button';
import { ZardAlertComponent } from '@/shared/components/alert';
import { ZardSeparatorComponent } from '@/shared/components/separator';
import { ZardSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    RouterLink,

    WeatherHeader,
    WeatherStatCard,

    ZardButtonComponent,
    ZardAlertComponent,
    ZardSeparatorComponent,
    ZardSkeletonComponent,
  ],
  templateUrl: './weather.html',
  styleUrl: './weather.css',
})
export class Weather implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly weatherService = inject(WeatherService);

  loading = signal(false);

  error = signal<string | null>(null);

  weather = signal<WeatherModel | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const city = params.get('city');

      if (!city) {
        this.error.set('Aucune ville indiquée.');
        return;
      }

      this.loadWeather(city);
    });
  }

  private loadWeather(city: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.weather.set(null);

    this.weatherService.getWeatherByCity(city).subscribe({
      next: (weather) => {
        this.weather.set(weather);

        this.loading.set(false);
      },

      error: (error) => {
        console.error(error);

        this.error.set(`Impossible de récupérer la météo pour ${city}.`);

        this.loading.set(false);
      },
    });
  }

  formatTimestamp(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleString('fr-FR');
  }
}
