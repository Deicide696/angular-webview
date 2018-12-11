import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AutosListComponent } from './autos-list/autos-list.component';
import { DataService } from '../../../../webview/src/app/data.service';

@NgModule({
  declarations: [AutosListComponent],
  exports: [AutosListComponent],
  imports: [
    CommonModule
	,HttpClientModule
  ],
  providers: [DataService],
})
export class AutosModule { }
