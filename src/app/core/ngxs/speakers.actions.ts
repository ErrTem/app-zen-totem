import { RatedSpeakerInterface } from '@core/services/backend.service';

export class GetSpeakersFromServer {
  static readonly type = '[Speakers] Add';

  constructor() {}
}

export class SetSearchQuery {
  static readonly type = '[Search] Set Search Query';

  constructor(public payload: string) {}
}

export class UpdateChunkIndex {
  static readonly type = '[Speakers] Update Chunk Index';

  constructor() {}
}

export class SortMostPopular {
  static readonly type = '[Speakers] Most Popular';

  constructor(public ratedSpeakers: RatedSpeakerInterface[]) {}
}

export class SortMostUnpopular {
  static readonly type = '[Speakers] Most Unpopular';

  constructor(public ratedSpeakers: RatedSpeakerInterface[]) {}
}

export class FilterFavorites {
  static readonly type = '[Speakers] Sort Favorites';
  constructor(public favorites: string[]) {}
}

export class ResetFilters {
  static readonly type = '[Speakers] Reset Filters';
}
