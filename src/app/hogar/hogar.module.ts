import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HogarListComponent } from './hogar-list/hogar-list.component';
import {DataService} from '../data.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HogarListComponent],
  imports: [
    CommonModule,
    NgbModule,
  ],
  providers: [DataService]
})
export class HogarModule { }
