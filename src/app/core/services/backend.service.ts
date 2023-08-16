import { Injectable, InjectionToken } from '@angular/core';
import { SpeakerInterface } from '@core/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FEATURED_USERS, RATED_USERS } from '@shared/constants';

export const BACKEND_SERVICE_TOKEN = new InjectionToken<BackendService>(
  'backend_service_token'
);

export interface RatedSpeakerInterface {
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

//todo need backend to piecewise loading
  public getSpeakers(): Observable<SpeakerInterface[]> {
    return this.http.get<SpeakerInterface[]>('assets/data/speakers.json');
  }

  //WORK WITH FEATURED USERS
  public addToFavorites(speaker: SpeakerInterface): void {
    const favorites = this.getFavorites();
    favorites.push(speaker._id);
    localStorage.setItem(FEATURED_USERS, JSON.stringify(favorites));
  }

  public removeFromFavorites(speaker: SpeakerInterface): void {
    const favorites = this.getFavorites();
    const updatedFavorites = favorites.filter(id => id !== speaker._id);
    localStorage.setItem(FEATURED_USERS, JSON.stringify(updatedFavorites));
  }

  public getFavorites(): string[] {
    return [...JSON.parse(localStorage.getItem(FEATURED_USERS) || '[]')];
  }

  public isInFavorites(speaker: SpeakerInterface): boolean {
    const favorites = this.getFavorites();
    return favorites.includes(speaker._id);
  }

  //WORK WITH RATING
  public updateRating(speaker: SpeakerInterface, rating: number): void {
    const ratedSpeaker = this.getRatedSpeaker();
    const existingRatedPersonIndex = ratedSpeaker.findIndex((p) => p._id === speaker._id);

    if (existingRatedPersonIndex === -1) {
      const newRatedPerson: RatedSpeakerInterface = {_id: speaker._id, rating};
      ratedSpeaker.push(newRatedPerson);
    } else {
      ratedSpeaker[existingRatedPersonIndex].rating = rating;
    }

    localStorage.setItem(RATED_USERS, JSON.stringify(ratedSpeaker));
  }

  public getRatedSpeaker(): RatedSpeakerInterface[] {
    return [...JSON.parse(localStorage.getItem(RATED_USERS) || '[]')];
  }

  public getRating(speaker: SpeakerInterface): number {
    const ratedSpeaker = this.getRatedSpeaker();
    const ratedPerson = ratedSpeaker.find((p) => p._id === speaker._id);
    return ratedPerson ? ratedPerson.rating : 0;
  }
}
