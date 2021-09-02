import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule, TitleCasePipe } from '@angular/common';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';
import { DialogService } from './services/dialog.service';
import { GroupsService } from './services/groups.service';

import { SimpleDialogComponent } from './components/ui/dialogs/simple.component';
import { LoginComponent } from './components/views/login/login.component';
import { DashboardComponent } from './components/views/dashboards/dashboard.component';
import { SessioninfoComponent } from './components/views/dashboards/common/sessioninfo/sessioninfo.component';
import { ObjectivehistoryComponent } from './components/views/dashboards/common/objectivehistory/objectivehistory.component';
import { ProgresstrackerComponent } from './components/views/dashboards/common/progresstracker/progresstracker.component';
import { StudentDashboardComponent } from './components/views/dashboards/student-dashboard/student-dashboard.component';
import { HomeComponent } from './components/views/home/home.component';
import { httpInterceptorProviders } from './interceptors';
import { UserstatusComponent } from './components/views/dashboards/common/userstatus/userstatus.component';
import { UtilsService } from './services/utils.service';
import { Simple2DialogComponent } from './components/ui/dialogs/simple2.component';
import { TeacherDashboardComponent } from './components/views/dashboards/teacher-dashboard/teacher-dashboard.component';
import { MenuselectorComponent } from './components/views/dashboards/common/menuselector/menuselector.component';
import { DashboardoverviewComponent } from './components/views/dashboards/common/dashboardoverview/dashboardoverview.component';
import { DashboardgamesComponent } from './components/views/dashboards/common/dashboardgames/dashboardgames.component';
import { DashboardgroupsComponent } from './components/views/dashboards/common/dashboardgroups/dashboardgroups.component';
import { GameCreateComponent } from './components/views/game/create/create.component';
import { DynamicsidebarComponent } from './components/ui/dynamicsidebar/dynamicsidebar.component';
import { DynCheckboxComponent } from './components/ui/dyn-checkbox/dyn-checkbox.component';
import { DynBasicTableComponent } from './components/ui/dyn-basic-table/dyn-basic-table.component';
import { GameEditResourcesComponent } from './components/views/game/edit/resources/resources.component';
import { NotFoundComponent } from './components/views/not-found/not-found.component';
import { FileUploadDialogComponent } from './components/ui/dialogs/fileupload.component';
import { GameDeleteComponent } from './components/views/game/delete/delete.component';
import { ResourceUrlTransformPipe } from './pipes/resource-url-transform.pipe';
import { GameEditLevelsComponent } from './components/views/game/edit/levels/levels.component';
import { GameEditLevelsAddComponentComponent } from './components/views/game/edit/levels/add/add.component';
import { GameEditLevelItemComponent } from './components/views/game/edit/levels/item/item.component';
import { GameEditorComponents } from './components/views/game/edit/editor/editor.component';
import { SceneEditorComponent } from './components/views/game/edit/editor/scene/scene.component';
import { AnimationComponent } from './components/views/game/edit/editor/animation/animation.component';
import { LogicComponent } from './components/views/game/edit/editor/logic/logic.component';
import { SceneMapComponent } from './components/views/game/edit/editor/scene/scenemap/scenemap.component';


@NgModule({
  declarations: [
    ResourceUrlTransformPipe,
    AppComponent,
    RegisterComponent,
    SimpleDialogComponent,
    Simple2DialogComponent,
    FileUploadDialogComponent,
    LoginComponent,
    StudentDashboardComponent,
    TeacherDashboardComponent,
    DashboardComponent,
    SessioninfoComponent,
    ObjectivehistoryComponent,
    ProgresstrackerComponent,
    HomeComponent,
    UserstatusComponent,
    MenuselectorComponent,
    DashboardoverviewComponent,
    DashboardgamesComponent,
    DashboardgroupsComponent,
    GameCreateComponent,
    DynamicsidebarComponent,
    DynCheckboxComponent,
    DynBasicTableComponent,
    GameEditResourcesComponent,
    NotFoundComponent,
    GameDeleteComponent,
    GameEditLevelsComponent,
    GameEditLevelsAddComponentComponent,
    GameEditLevelItemComponent,
    GameEditorComponents,
    SceneEditorComponent,
    AnimationComponent,
    LogicComponent,
    SceneMapComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSnackBarModule
  ],
  providers: [ApiService, UserService, DialogService, GroupsService, UtilsService, ResourceUrlTransformPipe, TitleCasePipe, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

(window as any).__Zone_disable_requestAnimationFrame = true;
(window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove'];