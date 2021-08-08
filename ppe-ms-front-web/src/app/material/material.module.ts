import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from "@angular/material/dialog";

@NgModule({
  imports: [
    CommonModule,
    Material.MatDialogModule,

  ],
  exports: [
    Material.MatDialogModule,

  ],
  declarations: []
})
export class MaterialModule { }