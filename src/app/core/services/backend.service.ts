import { Injectable, InjectionToken } from '@angular/core';
import { BackendPersonInterface } from '@core/interfaces';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';

export const BACKEND_SERVICE_TOKEN = new InjectionToken<BackendService>('backend_service_token');

@Injectable({
  providedIn: 'root'
})

//todo temporary until backend will be implemented;
export class BackendService {
  private readonly mockData: BackendPersonInterface[] = [];

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  getPeopleBatch(startIndex: number, batchSize: number): Observable<BackendPersonInterface[]> {
    // Simulate an asynchronous delay and return a batch of people
    return of(this.mockData.slice(startIndex, startIndex + batchSize)).pipe(
      delay(500) // Simulate network delay
    );
  }

}
