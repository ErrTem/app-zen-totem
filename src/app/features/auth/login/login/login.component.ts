import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";

import { UserInfoInterface } from "../../../../shared/interfaces/user.interface";
import { SetUserInfo } from "../../../app-common/profile/ngxs/profile.actions";
import { AuthService } from "../../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public userForm!: FormGroup

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
    private readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.initNewUserForm();
  }

  public login(): void {
    if (this.userForm.invalid) {
      return;
    }

    const randomRoles = ['Admin', 'User', 'Guest'];
    const randomRole = randomRoles[Math.floor(Math.random() * randomRoles.length)];
    this.authService.setLoggedInRole(randomRole);

    const userData: UserInfoInterface = this.generateUserData();
    this.authService.setUserInfo(userData);
    this.store.dispatch(new SetUserInfo(userData));
  }

  public initNewUserForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['',[
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255)
      ]],
    });
  }

  public generateUserData(): UserInfoInterface {

    return {
      firstName: this.userForm.get('firstName')?.value,
      lastName: this.userForm.get('lastName')?.value,
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const control : AbstractControl<any> | null = this.userForm.get(fieldName);

    if (control) {
      return control.invalid && (control.dirty || control.touched);
    } else
      return false
  }
}
