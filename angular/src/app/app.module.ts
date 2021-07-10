import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/views/register/register.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';
import { DialogService } from './services/dialog.service';
import { GroupsService } from './services/groups.service';

import { SimpleDialogComponent } from './components/ui/dialogs/simple/simple.component';
import { LoginComponent } from './components/views/login/login.component';
import { DashboardComponent } from './components/views/dashboards/dashboard.component';
import { SessioninfoComponent } from './components/views/dashboards/common/sessioninfo/sessioninfo.component';
import { ObjectivehistoryComponent } from './components/views/dashboards/common/objectivehistory/objectivehistory.component';
import { ProgresstrackerComponent } from './components/views/dashboards/common/progresstracker/progresstracker.component';
import { StudentDashboardComponent } from './components/views/dashboards/student-dashboard/student-dashboard.component';
import { HomeComponent } from './components/views/home/home.component';
import { httpInterceptorProviders } from './interceptors';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SimpleDialogComponent,
    LoginComponent,
    StudentDashboardComponent,
    DashboardComponent,
    SessioninfoComponent,
    ObjectivehistoryComponent,
    ProgresstrackerComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  providers: [ApiService, UserService, DialogService, GroupsService, httpInterceptorProviders],
  // providers: [ApiService, UserService, DialogService, GroupsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
