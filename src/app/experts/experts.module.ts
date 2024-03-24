import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { expertsRoutingModule } from "./experts-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../material/material.module";

import { AddComponent } from "./pages/add/add.component";
import { SearchComponent } from "./pages/search/search.component";
import { expertComponent } from "./pages/expert/expert.component";
import { HomeComponent } from "./pages/home/home.component";
import { ListComponent } from "./pages/list/list.component";
import { expertCardComponent } from "./components/expert-card/expert-card.component";
import { ImagePipe } from "./pipes/image.pipe";
import { ConfirmComponent } from "./components/confirm/confirm.component";
@NgModule({
  declarations: [
    AddComponent,
    SearchComponent,
    expertComponent,
    HomeComponent,
    ListComponent,
    expertCardComponent,
    ImagePipe,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    expertsRoutingModule,
    MaterialModule,
  ],
})
export class expertsModule {}
