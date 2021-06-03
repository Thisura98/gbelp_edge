import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboards/dashboard.component';
import { StudentDashboardComponent } from './components/dashboards/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './components/dashboards/teacher-dashboard/teacher-dashboard.component';
import { ParentDashboardComponent } from './components/dashboards/parent-dashboard/parent-dashboard.component';


const routes: Routes = [
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "dashboard/student", component: StudentDashboardComponent},
  {path: "dashboard/teacher", component: TeacherDashboardComponent},
  {path: "dashboard/parent", component: ParentDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
