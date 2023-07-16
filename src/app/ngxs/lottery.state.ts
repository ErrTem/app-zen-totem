import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from "@angular/core";

import { AddNewParticipant, DetermineWinner, SetParticipantCount } from "@ngxs/lottery.actions";
import { ProfileStateModel } from '@ngxs/profile.state';

const minUsers = 10;
const maxUsers = 10000;

export interface LotteryStateModel {
  participantCount: number;
  isWin: boolean;
  isMaxParticipantsReached: boolean;
  isWinnerDetermined: boolean;
}

export const LOTTERY_STATE_MODEL = new StateToken<LotteryStateModel>('lottery');

@State<LotteryStateModel>({
  name: 'LOTTERY_STATE_MODEL',
  defaults: {
    participantCount: 0,
    isWin: false,
    isMaxParticipantsReached: false,
    isWinnerDetermined: false,
  }
})

@Injectable()
export class LotteryState {

  @Selector()
  static getParticipantCount({ participantCount } : LotteryStateModel): number  {
    return participantCount;
  }
  @Selector()
  static getIsWin({ isWin } : LotteryStateModel): boolean  {
    return isWin;
  }

  @Selector()
  static getIsMaxParticipantsReached({ isMaxParticipantsReached } : LotteryStateModel): boolean  {
    return isMaxParticipantsReached;
  }

  @Action(SetParticipantCount)
  setParticipantCount(
    { patchState }: StateContext<LotteryStateModel>
  ): void {
    const generatedParticipantCount = Math.floor(Math.random() * (maxUsers - minUsers)) + minUsers;

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

    dispatch(new DetermineWinner());


    if (newParticipantCount >= maxUsers) {
      patchState({
        isMaxParticipantsReached: true
      });
    }
  }

  @Action(DetermineWinner)
  determineWinner(
    { patchState, getState }: StateContext<LotteryStateModel>
  ): void {
    const state = getState();
    //prevent multiple users from winning
    const { isWinnerDetermined } = state;

    if (!isWinnerDetermined) {
      // chance of win = 1/participantCount
      // since you want to provide equal chances to win to each user and show will go on
      // we can not use Math.random() * participantCount since for next user chance of win
      // will decrease and = 1/participantCount+1
      const randomNumber = Math.floor(Math.random() * maxUsers);

      if (!randomNumber) {
        patchState({
          isWin: true,
          isWinnerDetermined: true,
        });
      }
    } else {
      patchState({
        isWin: false
      });
    }
  }
}
