import { APP_IMPORTS } from './constants/modules.imports';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/views/register/register.component';

import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';
import { DialogService } from './services/dialog.service';
import { GroupsService } from './services/groups.service';
import { NextActionService } from './services/next-action.service';
import { MetaKeyService } from './services/metakey.service';
import { ArticlesService } from './services/articles.service';
import { PlayService } from './services/play.service';
import { UtilsService } from './services/utils.service';

import { SimpleDialogComponent } from './components/ui/dialogs/simple.component';
import { LoginComponent } from './components/views/login/login.component';
import { DashboardComponent } from './components/views/dashboards/dashboard.component';
import { SessioninfoComponent } from './components/views/dashboards/common/sessioninfo/sessioninfo.component';
import { ProgresstrackerComponent } from './components/views/dashboards/common/progresstracker/progresstracker.component';
import { StudentDashboardComponent } from './components/views/dashboards/student-dashboard/student-dashboard.component';
import { HomeComponent } from './components/views/home/home.component';
import { httpInterceptorProviders } from './interceptors';
import { UserstatusComponent } from './components/views/dashboards/common/userstatus/userstatus.component';
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
import { GameEditLevelsComponent } from './components/views/game/edit/levels/levels.component';
import { GameEditLevelsAddComponentComponent } from './components/views/game/edit/levels/add/add.component';
import { GameEditLevelItemComponent } from './components/views/game/edit/levels/item/item.component';
import { GameEditorComponents } from './components/views/game/edit/editor/editor.component';
import { SceneEditorComponent } from './components/views/game/edit/editor/scene/scene.component';
import { SceneObjectTransformBoxComponent } from './components/views/game/edit/editor/scene/transformbox/transformbox.component';
import { SceneMapComponent } from './components/views/game/edit/editor/scene/scenemap/scenemap.component';
import { PropertiesEditorComponent } from './components/views/game/edit/editor/properties/properties.component';
import { LogicEditorComponent } from './components/views/game/edit/editor/logic/logic.component';
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
import { PlayerObjectivesPanelComponent } from './components/views/players/panels/objectives/objectives.panel.component';
import { PlayerGuidancePanelComponent } from './components/views/players/panels/guidance/guidance.panel.component';
import { GroupReportsComponent } from './components/views/groups/reports/report.component';
import { GroupsSessionTable } from './components/ui/groups/session-data-table/groups.sessiontable';
import { GroupSessionComponent } from './components/views/groups/session/session.component';
import { GroupReportsAvailableComponent } from './components/views/groups/reports/available/available.component';
import { ReportAvailableCard } from './components/ui/groups/reports/available-report-card/available.report.card';
import { GroupReportsUsageComponent } from './components/views/groups/reports/usage/usage.component';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { CustomRenderer } from './utils/md-renderer';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LoadingReportsComponent } from './components/views/groups/reports/common/loading/loading.reports.component';
import { GroupReportsObjectiveComponent } from './components/views/groups/reports/objective/objective.component';
import { GroupReportsGuidanceComponent } from './components/views/groups/reports/guidance/guidance.component';
import { ToastrModule } from 'ngx-toastr';
import { GroupUsersComponent } from './components/views/groups/users/users.component';
import { GroupsUserTable } from './components/ui/groups/user-data-table/groups.usertable';
import { GroupsUserTableRows } from './components/ui/groups/user-data-table/row/groups.usertable.rows';

import { TitleCasePipe } from '@angular/common';
import { TextWrapPipe } from './pipes/text-wrap-pipe';
import { AnyToStringPipe } from './pipes/any-to-string.pipe';
import { ResourceUrlTransformPipe } from './pipes/resource-url-transform.pipe';

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
    LoadingReportsComponent,
    ReportAvailableCard,
    GroupReportsAvailableComponent,
    GroupReportsUsageComponent,
    GroupReportsObjectiveComponent,
    GroupReportsGuidanceComponent,
    GroupUsersComponent,
    GroupsUserTable,
    GroupsUserTableRows,
    StatefulButton,
    PlayerChatPanelComponent,
    PlayerObjectivesPanelComponent,
    PlayerGuidancePanelComponent
  ],
  imports: [
    ...APP_IMPORTS
  ],
  providers: [
    HttpClientModule,
    ApiService, UserService, DialogService, GroupsService, UtilsService, NextActionService, MetaKeyService, PlayService,
    ArticlesService,
    ResourceUrlTransformPipe, TitleCasePipe, AnyToStringPipe, TextWrapPipe,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

(window as any).__Zone_disable_requestAnimationFrame = true;
(window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove'];