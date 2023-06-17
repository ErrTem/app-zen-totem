import { UserInfoInterface } from "../../../../shared/interfaces/user.interface";

export class SetUserInfo {
  static readonly type = '[Profile] SetUserInfo';
  constructor(public userInfo: UserInfoInterface) {
  }
}

export class ValidateUserInfo {
  static readonly type = '[Profile] ValidateUserInfo';
  constructor(public userInfo: UserInfoInterface) {
  }
}
