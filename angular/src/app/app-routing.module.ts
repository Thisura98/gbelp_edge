import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { RegisterComponent } from './components/views/register/register.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/views/login/login.component';
import { DashboardComponent } from './components/views/dashboards/dashboard.component';
import { StudentDashboardComponent } from './components/views/dashboards/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './components/views/dashboards/teacher-dashboard/teacher-dashboard.component';
import { ParentDashboardComponent } from './components/views/dashboards/parent-dashboard/parent-dashboard.component';
import { DashboardoverviewComponent } from './components/views/dashboards/common/dashboardoverview/dashboardoverview.component';
import { DashboardgamesComponent } from './components/views/dashboards/common/dashboardgames/dashboardgames.component';
import { DashboardgroupsComponent } from './components/views/dashboards/common/dashboardgroups/dashboardgroups.component';
import { GameCreateComponent } from './components/views/game/create/create.component';
import { GameEditResourcesComponent } from './components/views/game/edit/resources/resources.component';
import { NotFoundComponent } from './components/views/not-found/not-found.component';
import { GameDeleteComponent } from './components/views/game/delete/delete.component';
import { GameEditLevelsComponent } from './components/views/game/edit/levels/levels.component';
import { GameEditLevelsAddComponentComponent } from './components/views/game/edit/levels/add/add.component';
import { GameEditorComponents } from './components/views/game/edit/editor/editor.component';
import { SceneEditorComponent } from './components/views/game/edit/editor/scene/scene.component';
import { AnimationEditorComponent } from './components/views/game/edit/editor/animation/animation.component';
import { LogicEditorComponent } from './components/views/game/edit/editor/logic/logic.component';
import { DocsComponent } from './components/views/docs/docs.component';
import { DocsArticlesComponent } from './components/views/docs/articles/articles.docs.component';
import { ScriptReferenceArticleComponent } from './components/views/docs/articles/pages/scripts/reference/script.ref.doc.component';
import { SplayComponent } from './components/views/players/splay/splay.component';
import { GroupCreateComponent } from './components/views/groups/create/create.component';
import { GroupOverviewComponent } from './components/views/groups/overview/overview.component';
import { GroupJoinComponent } from './components/views/groups/join/join.component';
import { GroupReportsComponent } from './components/views/groups/reports/report.component';
import { GroupSessionComponent } from './components/views/groups/session/session.component';
import { GroupReportsAvailableComponent } from './components/views/groups/reports/available/available.component';
import { GroupReportsUsageComponent } from './components/views/groups/reports/usage/usage.component';
import { ViewMode } from './constants/constants';



const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "dashboard/student", component: StudentDashboardComponent},
  {
    path: "dashboard/teacher", component: TeacherDashboardComponent,
    children: [
      {path: "overview", component: DashboardoverviewComponent},
      {path: "games", component: DashboardgamesComponent, data: { mode: ViewMode.GAME } },
      {path: "groups", component: DashboardgroupsComponent},
      {path: "templates", component: DashboardgamesComponent, data: { mode: ViewMode.TEMPLATE } },
    ]
  },
  {path: "dashboard/parent", component: ParentDashboardComponent},
  {path: "dashboard/f/:page", component: DashboardComponent, data: { mode: 'forward'} },
  {path: "groups/create", component: GroupCreateComponent},
  {path: "groups/overview", component: GroupOverviewComponent},
  {path: "groups/sessions", component: GroupSessionComponent},
  {path: "groups/reports", component: GroupReportsComponent},
  {path: "groups/join/:groupId", component: GroupJoinComponent},
  {path: "groups/reports/available", component: GroupReportsAvailableComponent},
  {path: "groups/reports/usage", component: GroupReportsUsageComponent},
  {path: "dashboard/parent", component: ParentDashboardComponent},
  {path: "game/create", component: GameCreateComponent, data: {editMode: false, mode: ViewMode.GAME }},
  {path: "game/edit", component: GameCreateComponent, data: {editMode: true, mode: ViewMode.GAME }},
  {path: "game/delete", component: GameDeleteComponent, data: { mode: ViewMode.GAME } },
  {path: "game/edit/resources", component: GameEditResourcesComponent, data: { mode: ViewMode.GAME } },
  {path: "game/edit/levels", component: GameEditLevelsComponent, data: { mode: ViewMode.GAME } },
  {path: "game/edit/levels/add", component: GameEditLevelsAddComponentComponent, data: { mode: ViewMode.GAME } },
  {
    path: "game/edit/editor", component: GameEditorComponents,
    data: { mode: ViewMode.GAME },
    children: [
      {path: "scene", component: SceneEditorComponent, data: { mode: ViewMode.GAME }},
      {path: "animation", component: AnimationEditorComponent, data: { mode: ViewMode.GAME }},
      {path: "logic", component: LogicEditorComponent, data: { mode: ViewMode.GAME }}
    ]
  },
  {path: "template/create", component: GameCreateComponent, data: {editMode: false, mode: ViewMode.TEMPLATE }},
  {path: "template/edit", component: GameCreateComponent, data: {editMode: true, mode: ViewMode.TEMPLATE }},
  {path: "template/delete", component: GameDeleteComponent, data: { mode: ViewMode.TEMPLATE } },
  {path: "docs", component: DocsComponent},
  {
    path: "docs/articles", 
    component: DocsArticlesComponent,
    children: [
      {path: "script/reference", component: ScriptReferenceArticleComponent}
    ]
  },
  {path: "splay/:sessionid", component: SplayComponent},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
