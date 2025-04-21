// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class WeatherService {

//   private apiKey = '95328c01f3a620c1e11b4473bbb8d3d7';
//   private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

//   constructor(private http: HttpClient) {}

//   getWeather(city: string): Observable<any> {
//     const url = `${this.apiUrl}?q=${city}&units=metric&appid=${this.apiKey}`;
//     return this.http.get(url);
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // ✅ This is critical
})
export class WeatherService {
  private apiKey = '95328c01f3a620c1e11b4473bbb8d3d7';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {} 

  getWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&units=metric&appid=${this.apiKey}`;
    return this.http.get(url);
  }

  
}
