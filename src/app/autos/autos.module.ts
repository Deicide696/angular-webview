import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutosListComponent } from './autos-list/autos-list.component';

@NgModule({
  declarations: [AutosListComponent],
  exports: [AutosListComponent],
  imports: [
    CommonModule
  ]
})
export class AutosModule { }
