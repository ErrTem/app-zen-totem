import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { UserInfoInterface } from "@core/interfaces/user.interface";
import { EMPTY_STRING } from "@shared/constants/empty-string";
//todo install node-sass-alias-importer

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent implements OnInit {
  public userForm!: FormGroup; //todo typification

  @Output() public loginSubmit : EventEmitter<UserInfoInterface> = new EventEmitter<UserInfoInterface>();
  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.initNewUserForm();
  }

  public login(): void {
    if (this.userForm.invalid) {
      return;
    }
    this.loginSubmit.emit(this.userForm.value);
  }

  public initNewUserForm() {
    this.userForm = this.formBuilder.group({
      firstName: [EMPTY_STRING,[
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255)
      ]],
      lastName: [EMPTY_STRING, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255)
      ]],
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const control : AbstractControl<any> | null = this.userForm.get(fieldName);

    if (control) {
      return control.invalid && (control.dirty || control.touched);
    } else
      return false;
  }
}
