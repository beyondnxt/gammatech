import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { UserComponent } from './pages/user/components/users/user.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'dashboards',
    component: DashboardComponent,
    loadChildren: () =>
    import("./dashboard/dashboard.module").then(m => m.DashboardModule)
  },
  {
    path: 'user',
    component: UserComponent,
    loadChildren: () =>
      import("./pages/user/users.module").then(m => m.UsersModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
