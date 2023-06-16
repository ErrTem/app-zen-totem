import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) { }

  public profileForm!: FormGroup

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      email: [{ value: 'example@example.com', disabled: true }],
      firstName: ['', [Validators.required, Validators.maxLength(255)]],
      lastName: ['', [Validators.required, Validators.maxLength(255)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      websiteUrl: ['', [Validators.required, Validators.pattern(/^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?\/?$/)]]
    });
  }

  formatPhoneNumber() {
    const phoneNumberControl = this.profileForm.get('phoneNumber');
    if (phoneNumberControl) {
      let phoneNumber = phoneNumberControl.value;

      // Remove any non-digit characters
      phoneNumber = phoneNumber.replace(/\D/g, '');

      // Add the country code
      phoneNumber = '+7' + phoneNumber;

      phoneNumberControl.setValue(phoneNumber);
    }
  }

  saveProfile() {
    if (this.profileForm.valid) {
      console.log('Profile saved successfully.');
    } else {
      console.log('Invalid form data.');
    }
  }
}
