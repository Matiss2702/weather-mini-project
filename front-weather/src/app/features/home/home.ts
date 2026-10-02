import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ZardBadgeComponent } from '@/shared/components/badge';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardInputComponent } from '@/shared/components/input';
import { ZardCardImports } from '@/shared/components/card/card.imports';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    ZardBadgeComponent,
    ZardButtonComponent,
    ZardInputComponent,
    ZardCardImports,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  city = '';
  loading = false;

  constructor(private router: Router) {}

  searchWeather(): void {
    const city = this.city.trim();

    if (!city) {
      return;
    }

    this.router.navigate(['/weather', city]);
  }
}
