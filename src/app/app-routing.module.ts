
import { ShorpingCardComponent } from './shared/components/shorping-card/shorping-card.component';
import { VirtualVisitComponent } from './virtual-visit/virtual-visit.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./@core/guards/auth.guard";
import { ContactComponent } from './shared/components/contact/contact.component';

const routes: Routes = [
  { path: "vv", component: VirtualVisitComponent, canActivate: [AuthGuard] },
  {
    path:'contact',component:ContactComponent
  },
  {
    path: "",
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
