import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from "@angular/core";

import { AddNewParticipant, DetermineWinner, SetParticipantCount } from "@ngxs/lottery.actions";

const minUsers = 10;
const maxUsers = 10000;

export interface LotteryStateModel {
  participantCount: number;
  isWinnerDetermined: boolean;
  isMaxParticipantsReached: boolean;
  weHaveWinner: boolean;
}

@State<LotteryStateModel>({
  name: 'LOTTERY_STATE_MODEL',
  defaults: {
      participantCount: 0,
      isWinnerDetermined: false,
      isMaxParticipantsReached: false,
       weHaveWinner: false,
  }
})

@Injectable()
export class LotteryState {

  @Selector()
  static getParticipantCount({ participantCount } : LotteryStateModel): number  {
    return participantCount;
  }
  @Selector()
  static getIsWinnerDetermined({ isWinnerDetermined } : LotteryStateModel): boolean  {
    return isWinnerDetermined;
  }

  @Selector()
  static getIsMaxParticipantsReached({ isMaxParticipantsReached } : LotteryStateModel): boolean  {
    return isMaxParticipantsReached;
  }

  @Action(SetParticipantCount)
  setParticipantCount(
    { patchState }: StateContext<LotteryStateModel>
  ): void {
    const generatedParticipantCount = Math.floor(Math.random() * (maxUsers - minUsers + 1)) + minUsers;

    patchState({
        participantCount: generatedParticipantCount,
      });
  }

  @Action(AddNewParticipant)
  addNewParticipant(
    { patchState, getState, dispatch }: StateContext<LotteryStateModel>
  ): void {

    const state = getState();
    let { participantCount: newParticipantCount } = state;
    newParticipantCount += 1;

    patchState({
        participantCount : newParticipantCount
    });

    if (newParticipantCount >= maxUsers) {
      patchState({
        isMaxParticipantsReached: true
      });
    }

    dispatch(new DetermineWinner());
  }

  @Action(DetermineWinner)
  determineWinner(
    { patchState, getState }: StateContext<LotteryStateModel>
  ): void {
    const state = getState();
    //prevent multiple users from winning
    let { weHaveWinner } = state;

    if (!weHaveWinner) {
      // chance of win = 1/participantCount
      // since you want to provide equal chances to win to each user and show will go on
      // we can not use Math.random() * participantCount since for next user chance of win
      // will decrease and = 1/participantCount+1
      const randomNumber = Math.floor(Math.random() * maxUsers);

      if (!randomNumber) {
        weHaveWinner = true;
        patchState({
          isWinnerDetermined: true,
          weHaveWinner: true,
        });
      }
    } else {
      patchState({
        isWinnerDetermined: false
      });
    }
  }
}
