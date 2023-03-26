import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./@core/guards/auth.guard";
import { VirtualVisitComponent } from "./virtual-visit/virtual-visit.component";

const routes: Routes = [
  { path: "vv", component: VirtualVisitComponent, canActivate: [AuthGuard] },

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
