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
      {path: "games", component: DashboardgamesComponent},
      {path: "groups", component: DashboardgroupsComponent},
    ]
  },
  {path: "groups/create", component: GroupCreateComponent},
  {path: "groups/overview", component: GroupOverviewComponent},
  {path: "dashboard/parent", component: ParentDashboardComponent},
  {path: "game/create", component: GameCreateComponent, data: {editMode: false}},
  {path: "game/edit", component: GameCreateComponent, data: {editMode: true}},
  {path: "game/delete", component: GameDeleteComponent},
  {path: "game/edit/resources", component: GameEditResourcesComponent},
  {path: "game/edit/levels", component: GameEditLevelsComponent},
  {path: "game/edit/levels/add", component: GameEditLevelsAddComponentComponent},
  {
    path: "game/edit/editor", component: GameEditorComponents,
    children: [
      {path: "scene", component: SceneEditorComponent},
      {path: "animation", component: AnimationEditorComponent},
      {path: "logic", component: LogicEditorComponent}
    ]
  },
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
