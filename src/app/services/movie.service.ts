import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '2245e7b70e506bfeca959594cb82c0b9'; 
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  private addApiKey(url: string): string {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}api_key=${this.apiKey}`;
  }

  getMovie(number: number): Observable<Response> {
    const url = this.addApiKey(`${this.baseUrl}/discover/movie?include_video=true&language=en-US&page=${number}&sort_by=popularity.desc`);
    return this.http.get<Response>(url);
  }
}