import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from "@angular/core";
import { Observable, tap } from 'rxjs';
import { SpeakerInterface } from '@core/interfaces';
import { BackendService } from '@core/services/backend.service';
import { GetSpeakersFromServer, SetSearchQuery } from '@core/ngxs/speakers.actions';

export interface SpeakersStateModel {
  Speakers: SpeakerInterface[];
  searchQuery: string;
}

export const SPEAKERS_STATE_MODEL = new StateToken<SpeakersStateModel>('Speakers');

@State<SpeakersStateModel>({
  name: 'SPEAKERS_STATE_MODEL',
  defaults: {
    Speakers: [],
    searchQuery: '',
  }
})

@Injectable()
export class SpeakersState {

  constructor(
    private readonly backendService: BackendService,
  ) {
  }

  @Selector()
  static getAllSpeakers(state: SpeakersStateModel): SpeakerInterface[] {
    return state.Speakers;
  }

  @Selector()
  static getQuery(state: SpeakersStateModel): string {
    return state.searchQuery;
  }

  @Action(SetSearchQuery)
  setSearchQuery(
    {patchState}: StateContext<SpeakersStateModel>,
    {payload}: SetSearchQuery
  ) {
    patchState({
      searchQuery: payload,
    });
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
            });
          }
        ))
  }
}
