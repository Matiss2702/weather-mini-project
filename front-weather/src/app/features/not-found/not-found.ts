import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ZardBadgeComponent } from '@/shared/components/badge';
import { ZardButtonComponent } from '@/shared/components/button';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, ZardBadgeComponent, ZardButtonComponent],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {}
