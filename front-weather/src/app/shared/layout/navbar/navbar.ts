import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import {ZardButtonComponent} from '@/shared/components/button';
import {ZardSeparatorComponent} from '@/shared/components/separator';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ZardButtonComponent,
    ZardSeparatorComponent
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

}
