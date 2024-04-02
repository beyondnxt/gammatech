import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToteboxComponent } from './component/totebox/totebox.component';
import { AddToteBoxComponent } from './component/add-tote-box/add-tote-box.component';

const routes: Routes = [
  {
    path:'',
    component: ToteboxComponent
},
{
    path:'add-tote-box',
    component:AddToteBoxComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToteboxRoutingModule { }
