import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthUserResponse, ServerResponseUserTypes } from 'src/app/models/user';
import { Md5 } from 'ts-md5/dist/md5';
import { UserService } from 'src/app/services/user.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordMinLength = 8;

  registerForm = new FormGroup({
    userType: new FormControl('', Validators.required),
    userName: new FormControl('', [
      Validators.required, 
      Validators.nullValidator, 
      Validators.maxLength(100),
      Validators.pattern(/^[a-zA-Z1234567890_]+$/)
    ]),
    userEmail: new FormControl('', [Validators.email]),
    userPassword: new FormControl('', [
      Validators.required, 
      Validators.minLength(this.passwordMinLength)
    ]),
    userPasswordConfirmation: new FormControl('', null, )
  }, { validators: this.formValidator });

  constructor(
    private location: Location,
    private router: Router,
    private apiService: ApiService,
    private userService: UserService,
    private dialogService: DialogService
  ){}

  ngOnInit(){
    this.apiService.getUserTypes().subscribe(values => this.userTypes = values);
  }

  // MARK: Data
  userTypes: ServerResponseUserTypes | undefined;

  /**
   * Username is smaller than max characters
   */
  get usernameOk(){
    const unField = this.registerForm.get('userName');

    if (!(unField?.touched))
      return true;

    return unField.valid
  }

  /**
   * Show/hide "Passwords do not match" message
   */
  get passwordsMatch(){
    const pwField = this.registerForm.get('userPassword');
    const pwConfirmField = this.registerForm.get('userPasswordConfirmation');

    if (!(pwField?.touched || pwConfirmField?.touched)){
      return true;
    }

    if (this.registerForm.touched && this.registerForm.dirty){
      return this.registerForm.errors == null
    }
    return false;
  }

  /**
   * Show/hide "Password min length" message
   */
  get passwordsMinLengthOk(){
    const pwField = this.registerForm.get('userPassword');
    const pwConfirmField = this.registerForm.get('userPasswordConfirmation');

    if (!(pwField?.touched || pwConfirmField?.touched)){
      return true;
    }

    if (pwField?.valid && pwConfirmField?.valid){
      return true;
    }

    return false;
  }

  // MARK: Private methods

  private formValidator(control: AbstractControl): ValidationErrors | null{
    const pw = control.get('userPassword')?.value;
    const pw_confirm = control.get('userPasswordConfirmation')?.value;
    if (pw && pw_confirm && pw == pw_confirm){
      return null;
    }
    else{
      return { passwordConfirmationFailed: true };
    }
  }
  
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  registerClicked(){
    console.log("REgister Clicked!", this.registerForm.valid);
    if (this.registerForm.valid){
      const f = this.registerForm;
      const md5 = new Md5();
      const pwHash = md5.appendStr(f.get('userPassword')?.value).end().toString();
      this.apiService.createUser(
        f.get('userName')?.value,
        f.get('userEmail')?.value,
        f.get('userType')?.value,
        pwHash
      ).subscribe(status => {
        if (status.success){
          const userId = status.data.user_id;
          const token = status.data.token;
          this.userService.setLoggedIn(userId, token);
          this.dialogService.showDismissable('Success!', 'Welcome to Edge!', () => {
            this.router.navigate(['/dashboard']);
          });
        }
        else{
          // todo: Show dialog service (error message)
          this.dialogService.showDismissable('Error', status.description);
        }
      })
    }
    else{
      this.dialogService.showDismissable('Registration', 'Please complete all fields correctory');
    }
  }

  cancelClicked(){
    this.location.back();
  }

}
