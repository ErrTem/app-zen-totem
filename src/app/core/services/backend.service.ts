import { Injectable, InjectionToken } from '@angular/core';
import { BackendPersonInterface } from '@core/interfaces';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';

export const BACKEND_SERVICE_TOKEN = new InjectionToken<BackendService>(
  'backend_service_token'
);

@Injectable({
  providedIn: 'root',
})

//todo temporary until backend will be implemented;
export class BackendService {
  constructor(private readonly http: HttpClient) {}

  getPeople(): Observable<BackendPersonInterface[]> {
    return this.http.get<BackendPersonInterface[]>('assets/data/people.json');
  }
}
