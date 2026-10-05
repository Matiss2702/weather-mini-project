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

  private readonly weatherDescriptions: Record<number, string> = {
    0: 'Ciel dégagé',
    1: 'Principalement dégagé',
    2: 'Partiellement nuageux',
    3: 'Couvert',
    45: 'Brouillard',
    48: 'Brouillard givrant',

    51: 'Bruine légère',
    53: 'Bruine modérée',
    55: 'Bruine dense',
    56: 'Bruine verglaçante légère',
    57: 'Bruine verglaçante dense',

    61: 'Pluie légère',
    63: 'Pluie modérée',
    65: 'Forte pluie',
    66: 'Pluie verglaçante légère',
    67: 'Forte pluie verglaçante',

    71: 'Faibles chutes de neige',
    73: 'Chutes de neige modérées',
    75: 'Fortes chutes de neige',
    77: 'Grains de neige',

    80: 'Faibles averses de pluie',
    81: 'Averses de pluie modérées',
    82: 'Violentes averses de pluie',

    85: 'Faibles averses de neige',
    86: 'Fortes averses de neige',

    95: 'Orage',
    96: 'Orage avec légère grêle',
    97: 'Orage violent',
    99: 'Orage avec forte grêle',
  };

  getWeatherDescription(code: number): string {
    return this.weatherDescriptions[code] ?? 'Conditions météorologiques inconnues';
  }
}
