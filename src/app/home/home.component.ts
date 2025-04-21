import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  city: string = '';
  weather: any;
  isDaytime: boolean = true;
  backgroundClass = 'default';

  constructor(private weatherService: WeatherService) {}


  ngOnInit() {
    const hour = new Date().getHours();
    this.isDaytime = hour >= 7 && hour < 18;  // 7 AM to 5:59 PM is daytime
    this.backgroundClass = this.isDaytime ? 'default' : 'night';
  }
  


getWeather() {
  this.weatherService.getWeather(this.city).subscribe((data) => {
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
  });
}
drops = Array.from({ length: 100 }).map(() => ({
  left: Math.random() * 100,
  duration: 0.4 + Math.random() * 0.6,
  delay: Math.random() * 5
}));



}
