import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnloadComponent } from './components/unload/unload.component';

const routes: Routes = [
  {
    path:'',
    component: UnloadComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnloadRoutingModule { }
