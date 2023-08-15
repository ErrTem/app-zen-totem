import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SpeakerInterface } from '@core/interfaces';
import { BackendService } from '@core/services/backend.service';
import {
  GetSpeakersFromServer, ResetFilters,
  SetSearchQuery, FilterFavorites, SortMostPopular, SortMostUnpopular,
  UpdateChunkIndex,
} from '@core/ngxs/speakers.actions';
import { CHUNK_SIZE } from '@shared/constants';

//todo backend should return totalCountOfPersons
export interface SpeakersStateModel {
  Speakers: SpeakerInterface[];
  searchQuery: string;
  filteredSpeakers: SpeakerInterface[];
  chunkIndex: number;
  totalCountOfPages: number;
}

export const SPEAKERS_STATE_MODEL = new StateToken<SpeakersStateModel>(
  'Speakers'
);

@State<SpeakersStateModel>({
  name: 'SPEAKERS_STATE_MODEL',
  defaults: {
    Speakers: [],
    searchQuery: '',
    filteredSpeakers: [],
    chunkIndex: 1,
    totalCountOfPages: 3,
  },
})
@Injectable()
export class SpeakersState {
  constructor(private readonly backendService: BackendService) {
  }

  @Selector()
  static getFilteredSpeakers(state: SpeakersStateModel): SpeakerInterface[] {
    return state.filteredSpeakers.slice(0, CHUNK_SIZE * state.chunkIndex);
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
      });
    } else {
      const {Speakers} = getState();
      let filteredSpeakers = [...Speakers];
      filteredSpeakers = filteredSpeakers.filter((speaker) =>
        speaker.name.toLowerCase().includes(payload.toLowerCase())
      );

      patchState({
        searchQuery: payload,
        filteredSpeakers: filteredSpeakers,
      });
    }
  }

  @Action(UpdateChunkIndex)
  updateChunkIndex(
    {patchState, getState}: StateContext<SpeakersStateModel>
  ) {
    const {chunkIndex, totalCountOfPages} = getState();
    const updateChunkIndex = chunkIndex + 1;

    if (chunkIndex <= totalCountOfPages) {
      patchState({
        chunkIndex: updateChunkIndex,
      });
    }
  }

  @Action(GetSpeakersFromServer)
  getSpeakersFromServer(
    {patchState}: StateContext<SpeakersStateModel>
  ): Observable<SpeakerInterface[]> {
    return this.backendService.getSpeakers().pipe(
      tap((data: SpeakerInterface[]) => {
        patchState({
          Speakers: data,
          filteredSpeakers: data,
        });
      })
    );
  }

  @Action(SortMostPopular)
  sortMostPopular(
    {patchState, getState}: StateContext<SpeakersStateModel>,
    {ratedSpeakers}: SortMostPopular
  ) {
    const {filteredSpeakers} = getState();
    const sortedSpeakers = [...filteredSpeakers].sort((a, b) => {
      const aRating = ratedSpeakers.find(rs => rs._id === a._id)?.rating || 0;
      const bRating = ratedSpeakers.find(rs => rs._id === b._id)?.rating || 0;
      return bRating - aRating;
    });

    patchState({
      filteredSpeakers: sortedSpeakers,
    });
  }

  @Action(SortMostUnpopular)
  sortMostUnpopular(
    {patchState, getState}: StateContext<SpeakersStateModel>,
    {ratedSpeakers}: SortMostUnpopular
  ) {
    const {filteredSpeakers} = getState();
    const sortedSpeakers = [...filteredSpeakers].sort((a, b) => {
      const aRating = ratedSpeakers.find(rs => rs._id === a._id)?.rating || 0;
      const bRating = ratedSpeakers.find(rs => rs._id === b._id)?.rating || 0;
      return aRating - bRating;
    });

    patchState({
      filteredSpeakers: sortedSpeakers,
    });
  }

  @Action(FilterFavorites)
  filterFavorites(
    {patchState, getState}: StateContext<SpeakersStateModel>,
    {favorites}: FilterFavorites
  ) {
    const {Speakers} = getState();
    const filteredSpeakers = Speakers.filter(speaker => favorites.includes(speaker._id));

    patchState({
      filteredSpeakers: filteredSpeakers,
    });
  }

  @Action(ResetFilters)
  resetFilters(
    {patchState, getState}: StateContext<SpeakersStateModel>
  ) {
    const {Speakers} = getState();
    patchState({
      searchQuery: '',
      filteredSpeakers: [...Speakers],
      chunkIndex: 1,
    });
  }
}

