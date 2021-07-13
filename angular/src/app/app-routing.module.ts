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
  {path: "dashboard/parent", component: ParentDashboardComponent},
  {path: "game/create", component: GameCreateComponent, data: {editMode: false}},
  {path: "game/edit", component: GameCreateComponent, data: {editMode: true}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
