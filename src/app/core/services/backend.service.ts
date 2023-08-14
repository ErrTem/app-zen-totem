import { Injectable, InjectionToken } from '@angular/core';
import { BackendPersonInterface } from '@core/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FEATURED_USERS, RATED_USERS } from '@shared/constants';

export const BACKEND_SERVICE_TOKEN = new InjectionToken<BackendService>(
  'backend_service_token'
);

export interface RatedPersonInterface {
  _id: string;
  rating: number;
}

@Injectable({
  providedIn: 'root',
})

//todo temporary until backend will be implemented;
export class BackendService {

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  public getPeople(): Observable<BackendPersonInterface[]> {
    return this.http.get<BackendPersonInterface[]>('assets/data/people.json');
  }

  //WORK WITH FEATURED USERS
  public addToFavorites(person: BackendPersonInterface): void {
    const favorites = this.getFavorites();
    if (!this.isInFavorites(person)) {
      favorites.push(person._id);
      localStorage.setItem(FEATURED_USERS, JSON.stringify(favorites));
    } else {
      const updatedFavorites = favorites.filter(id => id !== person._id);
      localStorage.setItem(FEATURED_USERS, JSON.stringify(updatedFavorites));
    }
  }

  public getFavorites(): string[] {
    return [...JSON.parse(localStorage.getItem(FEATURED_USERS) || '[]')];
  }

  public isInFavorites(person: BackendPersonInterface): boolean {
    const favorites = this.getFavorites();
    return favorites.includes(person._id);
  }

  //WORK WITH RATING
  public updateRating(person: BackendPersonInterface, rating: number): void {
    const ratedPeople = this.getRatedPeople();
    const existingRatedPersonIndex = ratedPeople.findIndex((p) => p._id === person._id);

    if (existingRatedPersonIndex === -1) {
      const newRatedPerson: RatedPersonInterface = {_id: person._id, rating};
      ratedPeople.push(newRatedPerson);
    } else {
      ratedPeople[existingRatedPersonIndex].rating = rating;
    }

    localStorage.setItem(RATED_USERS, JSON.stringify(ratedPeople));
  }

  public getRatedPeople(): RatedPersonInterface[] {
    return [...JSON.parse(localStorage.getItem(RATED_USERS) || '[]')];
  }

  public getRating(person: BackendPersonInterface): number {
    const ratedPeople = this.getRatedPeople();
    const ratedPerson = ratedPeople.find((p) => p._id === person._id);
    return ratedPerson ? ratedPerson.rating : 0;
  }
}
