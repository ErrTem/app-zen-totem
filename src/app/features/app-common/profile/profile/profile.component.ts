import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { UserInfoInterface } from '../../../../shared/interfaces/user.interface';
import { ProfileState } from '../ngxs/profile.state';
import { ValidateUserInfo } from '../ngxs/profile.actions';
import { emailValidationPattern } from '../../../../shared/constants/email-validation';
import { ProfileService } from "../profile.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  public profileForm!: FormGroup

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
    private readonly profileService: ProfileService,
  ) { }

  @Select (ProfileState.getUserInfo) userInfo$!: Observable<UserInfoInterface>

  ngOnInit(): void {
    this.initNewProductForm();
  }

  public initNewProductForm() {
    this.profileForm = this.formBuilder.group({
      email: [{
        value: 'example@example.com', disabled: true
      }],
      firstName: ['',[
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255)
      ]],
      //todo +7 covers data from store
      phoneNumber: ['+7', [
        Validators.required,
        Validators.pattern(/^7\d{10}$/)
      ]],
      websiteUrl: ['', [
        Validators.pattern(emailValidationPattern
        )
      ]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const control : AbstractControl<any> | null = this.profileForm.get(fieldName);

    if (control) {
      return control.invalid && (control.dirty || control.touched);
    } else
      return false
  }

  // jQuery plugin https://github.com/jackocnr/intl-tel-input
  formatPhoneNumber(event: Event): void {
    const phoneNumberControl = this.profileForm.get('phoneNumber');
    if (phoneNumberControl) {
      let phoneNumber = phoneNumberControl.value;

      // Remove any non-digit characters
      phoneNumber = phoneNumber.replace(/\D/g, '');

      // Ensure that the country code is at the beginning
      if (!phoneNumber.startsWith('7')) {
        phoneNumber = '7' + phoneNumber;
      }

      // Restrict input to only numbers
      const inputElement = event.target as HTMLInputElement;
      inputElement.value = phoneNumber;

      // Update the form control value
      phoneNumberControl.setValue(phoneNumber);
    }
  }

  public generateUserInfo(): UserInfoInterface {

    return {
      email: this.profileForm.get('email')?.value,
      firstName: this.profileForm.get('firstName')?.value,
      lastName: this.profileForm.get('lastName')?.value,
      phoneNumber: this.profileForm.get('phoneNumber')?.value,
      websiteUrl: this.profileForm.get('websiteUrl')?.value || '',
    }
  }

  public updateUserInfo(): void {
    const userInfo: UserInfoInterface = this.generateUserInfo();

    this.profileService.updateUserInfo(userInfo).subscribe(
      () => {
        this.showSuccessMessage();
      },
      () => {
        this.showErrorMessage();
      }
    );
  }

  private showSuccessMessage(): void {
  }

  private showErrorMessage(): void {
  }

  public getSome() {
    this.profileService.getUserInfo().subscribe((data)=>{
      console.log(data);
    })
  }

  // public updateUserInfo(userInfo: UserInfoInterface): Observable<any> {
  //   if (userInfo.firstName === 'A') {
  //     // error from API
  //     return throwError('Error updating profile');
  //   } else {
  //     return this.http.put(`${this.apiUrl}/userinfo`, userInfo);
  //   }
  // }
}
