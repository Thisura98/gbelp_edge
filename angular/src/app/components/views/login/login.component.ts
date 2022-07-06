import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthUserResponse, ServerResponseUserAuth, ServerResponseUserTypes } from 'src/app/models/user';
import { Md5 } from 'ts-md5/dist/md5';
import { UserService } from 'src/app/services/user.service';
import { DialogService } from 'src/app/services/dialog.service';
import { NextSignInAction, QueryKey } from 'src/app/constants/constants';
import { NextActionService } from 'src/app/services/next-action.service';

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

  private nextAction: string | undefined;
  private nextActionKey: string | undefined;

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private dialogService: DialogService,
    private nextActionService: NextActionService
  ){}

  ngOnInit(){
    if (this.userService.getIsLoggedIn()){
      this.router.navigate(['/dashboard']);
      return;
    }
    
    this.activatedRoute.queryParamMap.subscribe(map => {
      if (map.has(QueryKey.nextAction)){
        this.nextAction = map.get(QueryKey.nextAction)!;
        this.nextActionKey = map.get(QueryKey.nextActionKey)!;
      }
      this.apiService.user.getUserTypes().subscribe(values => this.userTypes = values);
    });
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
      this.apiService.user.loginUser(
        f.get('userEmail')?.value,
        pwHash
      ).subscribe(status => {
        if (status.success){
          this.handleLoginSuccess(status);
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

  private handleLoginSuccess(status: ServerResponseUserAuth){
    this.userService.setLoggedIn(status.data);

    if (this.nextAction != undefined && this.nextAction != null){
      this.handleNextAction();
    }
    else{
      this.router.navigate(['/dashboard']);
    }
  }

  private handleNextAction(){
    this.nextActionService.handleNextAction(
      this.nextAction! as NextSignInAction,
      this.nextActionKey!
    )
  }

}
