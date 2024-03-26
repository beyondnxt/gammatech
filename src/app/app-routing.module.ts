import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { UserComponent } from './pages/user/components/users/user.component';
import { LoginComponent } from './shared/components/login/login.component';
import { WorkOrderComponent } from './pages/work-order/components/work-order/work-order.component';
import { RolesComponent } from './pages/roles/components/roles/roles.component';
import { ToteboxComponent } from './pages/totebox/component/totebox/totebox.component';
import { ForgetPageComponent } from './shared/components/forget-page/forget-page.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { UnloadComponent } from './pages/unload/components/unload/unload.component';
import { CompletedComponent } from './pages/completed/components/completed/completed.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboards',
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
      {
        path: 'roles',
        component: RolesComponent,
        loadChildren: () =>
          import("./pages/roles/roles.module").then(m => m.RolesModule)
      },
      {
        path: 'tote-box',
        component: ToteboxComponent,
        loadChildren: () =>
          import("./pages/totebox/totebox.module").then(m => m.ToteboxModule)
      },
      {
        path: 'unloaded-box',
        component: UnloadComponent,
        loadChildren: () =>
          import("./pages/unload/unload.module").then(m => m.UnloadModule)
      },
      {
        path: 'completed',
        component: CompletedComponent,
        loadChildren: () =>
          import("./pages/completed/completed.module").then(m => m.CompletedModule)
      },
      {
        path: '',
        children: [
          {
            path: 'sales',
            loadChildren: () =>
            import("./dashboard/dashboard.module").then(m => m.DashboardModule)
          },
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  },

];

// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: '/login',
//     pathMatch: 'full'
//   },
//   {
//     path: 'login',
//     component: LoginComponent
//   },
//   {
//     path: 'change-password/:userId',
//     component: ForgetPageComponent,
//   },
//   {
//     path: 'dashboards',
//     component: DashboardComponent,
//     loadChildren: () =>
//     import("./dashboard/dashboard.module").then(m => m.DashboardModule)
//   },
//   {
//     path: 'user',
//     component: UserComponent,
//     loadChildren: () =>
//       import("./pages/user/users.module").then(m => m.UsersModule)
//   },
//   {
//     path: 'work-order',
//     component: WorkOrderComponent,
//     loadChildren: () =>
//       import("./pages/work-order/work-order.module").then(m => m.WorkOrderModule)
//   },
//   {
//     path: 'roles',
//     component: RolesComponent,
//     loadChildren: () =>
//       import("./pages/roles/roles.module").then(m => m.RolesModule)
//   },
//   {
//     path: 'tote-box',
//     component: ToteboxComponent,
//     loadChildren: () =>
//       import("./pages/totebox/totebox.module").then(m => m.ToteboxModule)
//   },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
