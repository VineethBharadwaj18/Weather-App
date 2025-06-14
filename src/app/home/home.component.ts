import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WeatherService } from '../weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  city: string = '';
  weather: any;
  isDaytime: boolean = true;
  backgroundClass = 'default';

  constructor(private weatherService: WeatherService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    const hour = new Date().getHours();
    this.isDaytime = hour >= 7 && hour < 18;
    this.backgroundClass = this.isDaytime ? 'default' : 'night';
  }

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        this.weather = data;

        const main = data.weather[0].main.toLowerCase();
        const hour = new Date().getHours();
        const isNight = hour >= 18 || hour < 6;

        if (isNight) {
          this.backgroundClass = 'night';
        } else if (main.includes('cloud')) {
          this.backgroundClass = 'cloudy';
        } else if (main.includes('rain')) {
          this.backgroundClass = 'rainy';
        } else if (main.includes('sun') || main.includes('clear')) {
          this.backgroundClass = 'sunny';
        } else {
          this.backgroundClass = 'default';
        }
      },
      error: (error) => {
        if (error.error?.message === 'city not found') {
          this.snackBar.open('❌ City not found. Please enter a valid city name.', 'Close', {
            duration: 3000,
            panelClass: ['toast-error'],
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        } else {
          this.snackBar.open('❌ Failed to fetch weather data. Try again later.', 'Close', {
            duration: 3000,
            panelClass: ['toast-error'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      }
    });
  }

  drops = Array.from({ length: 100 }).map(() => ({
    left: Math.random() * 100,
    duration: 0.4 + Math.random() * 0.6,
    delay: Math.random() * 5
  }));
}
