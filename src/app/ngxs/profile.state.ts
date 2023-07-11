import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ClearUserInfo, SetUserInfo } from "./profile.actions";
import { Injectable } from "@angular/core";
import { UserInfoInterface } from "@core/interfaces/user.interface";
import { EMPTY_STRING } from "@shared/constants/empty-string";

export interface ProfileStateModel {
 userInfo: UserInfoInterface;
}

const defaultUserInfo: UserInfoInterface = {
  email: EMPTY_STRING,
  firstName: EMPTY_STRING,
  lastName: EMPTY_STRING,
  phoneNumber: EMPTY_STRING,
  websiteUrl: EMPTY_STRING,
};

@State<ProfileStateModel>({
  name: 'PROFILE_STATE_MODEL',
  defaults: {
    userInfo: defaultUserInfo,
  }
})

@Injectable()
export class ProfileState {

  @Selector()
  static getUserInfo({ userInfo }: ProfileStateModel): UserInfoInterface {
    return userInfo;
  }

  @Action(SetUserInfo)
  setUserInfo(
    { patchState }: StateContext<ProfileStateModel>,
    { userInfo }: SetUserInfo
    ): void {

    patchState({
      userInfo: userInfo
    });
  }

  @Action(ClearUserInfo)
  clearUserInfo(
    { patchState }: StateContext<ProfileStateModel>,
  ): void {
    patchState({
      userInfo : defaultUserInfo,
    });
  }
}
