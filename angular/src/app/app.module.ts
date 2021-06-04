import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
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

import { SimpleDialogComponent } from './components/dialogs/simple/simple.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboards/dashboard.component';
import { SessioninfoComponent } from './components/dashboards/common/sessioninfo/sessioninfo.component';
import { ObjectivehistoryComponent } from './components/dashboards/common/objectivehistory/objectivehistory.component';
import { ProgresstrackerComponent } from './components/dashboards/common/progresstracker/progresstracker.component';
import { StudentDashboardComponent } from './components/dashboards/student-dashboard/student-dashboard.component';

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
    ProgresstrackerComponent
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
  providers: [ApiService, UserService, DialogService, GroupsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
