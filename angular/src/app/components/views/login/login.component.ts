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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passwordMinLength = 8;

  loginForm = new FormGroup({
    userEmail: new FormControl('', [Validators.email]),
    userPassword: new FormControl('', [
      Validators.required, 
      Validators.minLength(this.passwordMinLength)
    ])
  });

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

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  loginClicked(){
    if (this.loginForm.valid){
      const f = this.loginForm;
      const md5 = new Md5();
      const pwHash = md5.appendStr(f.get('userPassword')?.value).end().toString();
      this.apiService.loginUser(
        f.get('userEmail')?.value,
        pwHash
      ).subscribe(status => {
        if (status.success){
          this.userService.setLoggedIn(status.data);
          this.router.navigate(['/dashboard']);
        }
        else{
          // todo: Show dialog service (error message)
          this.dialogService.showDismissable('Error', status.description);
        }
      })
    }
    else{
      this.dialogService.showDismissable('Login', 'Please complete all fields correctory');
    }
  }

  cancelClicked(){
    this.location.back();
  }

}
