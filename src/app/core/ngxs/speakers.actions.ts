export class GetSpeakersFromServer {
  static readonly type = '[Speakers] Add';

  constructor() {}
}

export class SetSearchQuery {
  static readonly type = '[Search] Set Search Query';

  constructor(public payload: string) {}
}
