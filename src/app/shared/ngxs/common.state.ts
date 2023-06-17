import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

export interface CommonStateModel {
}

@State<CommonStateModel>({
  name: 'COMMON_STATE_MODEL', // todo name
  defaults: {
  }
})

@Injectable()
export class CommonState {
}
