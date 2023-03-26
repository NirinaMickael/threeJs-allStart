import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VirtualVisitComponent } from './virtual-visit/virtual-visit.component';

const routes: Routes = [
  {path: 'vv', component: VirtualVisitComponent},
  {
    path:'',
    children: [
      {
        path:'',
        loadChildren : ()=>import('./pages/auth/auth.module').then(m=>m.AuthModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
