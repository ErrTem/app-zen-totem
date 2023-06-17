import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetUserInfo, ValidateUserInfo } from "./profile.actions";
import { Injectable } from "@angular/core";
import { UserInfoInterface } from "../../../../shared/interfaces/user.interface";

export interface ProfileStateModel {
 userInfo: UserInfoInterface;
}

@State<ProfileStateModel>({
  name: 'PROFILE_STATE_MODEL',
  defaults: {
    userInfo: {
      email: '',
      firstName: 'bEBRA',
      lastName: '',
      phoneNumber: '',
      websiteUrl: '',
    }
  }
})

@Injectable() //todo зачем и почему без него не работает?
export class ProfileState {

  @Selector()
  static getUserInfo({userInfo}: ProfileStateModel): UserInfoInterface {
    return userInfo;
  }

  @Selector()
  static getUserNames({userInfo}: ProfileStateModel): UserInfoInterface { //todo сделать деструктуризацию и вернуть first/last name
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

  @Action(ValidateUserInfo)
  validateUserInfo (
    { dispatch}: StateContext<ProfileStateModel>,
    { userInfo } : ValidateUserInfo
  ) : void {
    const { firstName : firstName} = userInfo;

    if (firstName.length < 2) {
      console.log('failed')
      // dispatch(new ShowAlert())

    } else {
      // dispatch(new ShowSuccess()) //todo how and where?
      dispatch(new SetUserInfo(userInfo))
    }
  }
}
