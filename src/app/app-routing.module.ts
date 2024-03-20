import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { UserComponent } from './pages/user/components/users/user.component';
import { LoginComponent } from './shared/components/login/login.component';
import { WorkOrderComponent } from './pages/work-order/components/work-order/work-order.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
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
  {
    path: 'work-order',
    component: WorkOrderComponent,
    loadChildren: () =>
      import("./pages/work-order/work-order.module").then(m => m.WorkOrderModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
