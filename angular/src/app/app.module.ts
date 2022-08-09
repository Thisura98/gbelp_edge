import { NgModule, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';

import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';
import { DialogService } from './services/dialog.service';
import { GroupsService } from './services/groups.service';
import { NextActionService } from './services/next-action.service';
import { MetaKeyService } from './services/metakey.service';
import { ArticlesService } from './services/articles.service';

import { SimpleDialogComponent } from './components/ui/dialogs/simple.component';
import { LoginComponent } from './components/views/login/login.component';
import { DashboardComponent } from './components/views/dashboards/dashboard.component';
import { SessioninfoComponent } from './components/views/dashboards/common/sessioninfo/sessioninfo.component';
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
import { SceneObjectTransformBoxComponent } from './components/views/game/edit/editor/scene/transformbox/transformbox.component';
import { SceneMapComponent } from './components/views/game/edit/editor/scene/scenemap/scenemap.component';
import { PropertiesEditorComponent } from './components/views/game/edit/editor/properties/properties.component';
import { LogicEditorComponent } from './components/views/game/edit/editor/logic/logic.component';
import { AnyToStringPipe } from './pipes/any-to-string.pipe';
import { DocsComponent } from './components/views/docs/docs.component';
import { DocsArticlesComponent } from './components/views/docs/articles/articles.docs.component';
import { ScriptReferenceArticleComponent } from './components/views/docs/articles/pages/scripts/reference';
import { PropertiesArticleComponent } from './components/views/docs/articles/pages/properties';
import { SplayComponent } from './components/views/players/splay/splay.component';
import { PlayerControlButtonComponent } from './components/views/players/controlbtn/controlbtn.component';
import { GroupCreateComponent } from './components/views/groups/create/create.component';
import { StatefulButton } from './components/ui/buttons/stateful-button/statefulbtn.component';
import { GroupOverviewComponent } from './components/views/groups/overview/overview.component';
import { GroupsMenuselectorComponent } from './components/views/groups/common/menuselector/menuselector.component';
import { GroupJoinComponent } from './components/views/groups/join/join.component';
import { PlayerChatPanelComponent } from './components/views/players/panels/chat/chat.panel.component';
import { GroupReportsComponent } from './components/views/groups/reports/report.component';
import { GroupsSessionTable } from './components/ui/groups/session-data-table/groups.sessiontable';
import { GroupSessionComponent } from './components/views/groups/session/session.component';
import { GroupReportsAvailableComponent } from './components/views/groups/reports/available/available.component';
import { ReportAvailableCard } from './components/ui/groups/reports/available-report-card/available.report.card';
import { GroupReportsUsageComponent } from './components/views/groups/reports/usage/usage.component';
import { TextWrapPipe } from './pipes/text-wrap-pipe';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { CustomRenderer } from './services/md-renderer';


@NgModule({
  declarations: [
    ResourceUrlTransformPipe,
    AnyToStringPipe,
    TextWrapPipe,
    AppComponent,
    RegisterComponent,
    SimpleDialogComponent,
    Simple2DialogComponent,
    FileUploadDialogComponent,
    LoginComponent,
    StudentDashboardComponent,
    TeacherDashboardComponent,
    DashboardComponent,
    DashboardoverviewComponent,
    DashboardgamesComponent,
    DashboardgroupsComponent,
    SessioninfoComponent,
    ProgresstrackerComponent,
    HomeComponent,
    UserstatusComponent,
    MenuselectorComponent,
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
    SceneObjectTransformBoxComponent,
    SceneMapComponent,
    PropertiesEditorComponent,
    LogicEditorComponent,
    DocsComponent,
    DocsArticlesComponent,
    ScriptReferenceArticleComponent,
    PropertiesArticleComponent,
    SplayComponent,
    PlayerControlButtonComponent,
    GroupsSessionTable,
    GroupsMenuselectorComponent,
    GroupCreateComponent,
    GroupOverviewComponent,
    GroupJoinComponent,
    GroupSessionComponent,
    GroupReportsComponent,
    ReportAvailableCard,
    GroupReportsAvailableComponent,
    GroupReportsUsageComponent,
    StatefulButton,
    PlayerChatPanelComponent
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
    MatSnackBarModule,
    MatTooltipModule,
    MonacoEditorModule,
    MarkdownModule.forRoot({ 
      loader: HttpClient, 
      sanitize: SecurityContext.NONE, // to allow 'id' attributes in CustomRenderer
      markedOptions: {
        provide: MarkedOptions,
        useFactory: CustomRenderer,
      } 
    })
  ],
  providers: [
    ApiService, UserService, DialogService, GroupsService, UtilsService, NextActionService, MetaKeyService,
    ArticlesService,
    ResourceUrlTransformPipe, TitleCasePipe, AnyToStringPipe, TextWrapPipe,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

(window as any).__Zone_disable_requestAnimationFrame = true;
(window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove'];