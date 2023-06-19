import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetUserInfo, ValidateUserInfo } from "./profile.actions";
import { Injectable } from "@angular/core";
import { UserInfoInterface } from "../../../../shared/interfaces/user.interface";

export interface ProfileStateModel {
 userInfo: UserInfoInterface;
}

@State<ProfileStateModel>({
  name: 'PROFILE_STATE_MODEL', //todo name
  defaults: {
    userInfo: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      websiteUrl: '',
    }
  }
})

@Injectable()
export class ProfileState {

  @Selector()
  static getUserInfo({userInfo}: ProfileStateModel): UserInfoInterface {
    return userInfo;
  }

  @Action(SetUserInfo)
  setUserInfo(
    { patchState }: StateContext<ProfileStateModel>,
    {userInfo}: SetUserInfo
    ): void {

    patchState({
      userInfo: userInfo
    });
  }
}
