import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './components/roles/roles.component';
import { AddRolesComponent } from './components/add-roles/add-roles.component';


const routes: Routes = [
  {
    path:'',
    component: RolesComponent
},
{
    path:'add-role',
    component:AddRolesComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
