import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'api-assistant-how-it-works',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css'],
})
export class HowItWorksComponent {}
