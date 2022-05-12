import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/custom-form-validator/custom-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm = new FormGroup({
    first_name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      // Để angular tự call function này 
      CustomValidators.specialCharacters
    ]),
    last_name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    contacts: new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})\\b'),
      ]),
    }),
    shippingAddress: new FormArray([]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
    ]),
    isReceivePromotion: new FormControl(false, []),
  });

  constructor() {}

  ngOnInit(): void {}

  get first_name() {
    return this.signUpForm.get('first_name');
  }

  get last_name() {
    return this.signUpForm.get('last_name');
  }

  get contacts() {
    return this.signUpForm.get('contacts');
  }

  get email() {
    return this.contacts.get('email');
  }

  get phone() {
    return this.contacts.get('phone');
  }

  get shippingAddress() {
    return this.signUpForm.get('shippingAddress');
  }

  addNewShippingAddress() {
    this.shippingAddress['controls'].push(
      new FormGroup({
        addressName: new FormControl('', [Validators.required]),
        addressDetail: new FormControl('', [Validators.required]),
      })
    );
    console.log(this.shippingAddress);
  }

  onDelete(i) {
    this.shippingAddress['removeAt'](i)
  }

  get password() {
    return this.signUpForm.get('password');
  }

  log() {
    console.log(this.signUpForm);
  }
}
