import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  passwordValue: String = "";
  // passwordValue: String = "";

  registerForm = new FormGroup({
    userType: new FormControl('', Validators.required),
    userName: new FormControl('', [Validators.required, Validators.nullValidator]),
    userEmail: new FormControl('', [Validators.email]),
    userPassword: new FormControl('', [this.passwordValidator.bind(this)]),
    userPasswordConfirmation: new FormControl('', null, )
  });

  // TODO: Get these from server
  userTypes = Array<Array<String>>(
    ["1", "Teacher"],
    ["2", "Student"],
    ["3", "Parent"]
  );

  private passwordValidator(value: AbstractControl): ValidationErrors{
    console.log("passwordValue =", this.passwordValue)
    return [];
  }
  
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

}
