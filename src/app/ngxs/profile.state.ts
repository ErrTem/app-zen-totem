import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ClearUserInfo, SetUserInfo } from "./profile.actions";
import { Injectable } from "@angular/core";
import { UserInfoInterface } from "@core/interfaces/user.interface";

export interface ProfileStateModel {
 userInfo: UserInfoInterface;
}

const defaultUserInfo: UserInfoInterface = {
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  websiteUrl: '',
};
//todo caonstant for empty string
@State<ProfileStateModel>({
  name: 'PROFILE_STATE_MODEL', //todo name
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
