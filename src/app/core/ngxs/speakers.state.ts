import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from "@angular/core";
import { Observable, tap } from 'rxjs';
import { SpeakerInterface } from '@core/interfaces';
import { BackendService } from '@core/services/backend.service';
import { GetSpeakersFromServer, SetSearchQuery } from '@core/ngxs/speakers.actions';

export interface SpeakersStateModel {
  Speakers: SpeakerInterface[];
  searchQuery: string;
  filteredSpeakers: SpeakerInterface[];
}

export const SPEAKERS_STATE_MODEL = new StateToken<SpeakersStateModel>('Speakers');

@State<SpeakersStateModel>({
  name: 'SPEAKERS_STATE_MODEL',
  defaults: {
    Speakers: [],
    searchQuery: '',
    filteredSpeakers: [],
  }
})

@Injectable()
export class SpeakersState {

  constructor(
    private readonly backendService: BackendService,
  ) {
  }

  @Selector()
  static getFilteredSpeakers(state: SpeakersStateModel): SpeakerInterface[] {
    return state.filteredSpeakers;
  }

  @Selector()
  static getQuery(state: SpeakersStateModel): string {
    return state.searchQuery;
  }

  @Action(SetSearchQuery)
  setSearchQuery(
    {patchState, getState}: StateContext<SpeakersStateModel>,
    {payload}: SetSearchQuery
  ) {
    if (!payload) {
      patchState({
        searchQuery: '',
      })
    } else {

      const {Speakers} = getState();
      let filteredSpeakers = [...Speakers];
      filteredSpeakers = filteredSpeakers.filter(speaker =>
        speaker.name.toLowerCase().includes(payload.toLowerCase())
      );

      patchState({
        searchQuery: payload,
        filteredSpeakers: filteredSpeakers,
      });
    }
  }

  @Action(GetSpeakersFromServer)
  getSpeakersFromServer(
    {patchState}: StateContext<SpeakersStateModel>,
  ): Observable<SpeakerInterface[]> {

    return this.backendService.getSpeakers()
      .pipe(
        tap(
          (data: SpeakerInterface[]) => {

            patchState({
              Speakers: data,
              filteredSpeakers: data,
            });
          }
        ))
  }
}
