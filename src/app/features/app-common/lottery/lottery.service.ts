import { Injectable } from '@angular/core';
import { Store } from "@ngxs/store";
import { AddNewParticipant, SetParticipantCount } from "@ngxs/lottery.actions";

@Injectable({
  providedIn: 'root'
})
export class LotteryService {
  constructor(
    private readonly store: Store,
  ) {
  }

  initLotteryParticipants() {
    this.store.dispatch(new SetParticipantCount());
  }

  participate() {
    this.store.dispatch(new AddNewParticipant());
  }
}
