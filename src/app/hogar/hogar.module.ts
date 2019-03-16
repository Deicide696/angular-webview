import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HogarListComponent } from './hogar-list/hogar-list.component';
import {DataService} from '../data.service';

@NgModule({
  declarations: [HogarListComponent],
  imports: [
    CommonModule
  ],
  providers: [DataService]
})
export class HogarModule { }
