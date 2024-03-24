import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorPageComponent } from "./shared/error-page/error-page.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./experts/experts.module").then((m) => m.expertsModule),
  },
  {
    path: "**",
    loadChildren: () =>
      import("./experts/experts.module").then((m) => m.expertsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
