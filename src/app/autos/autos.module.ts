import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AutosListComponent } from './autos-list/autos-list.component';
import { DataService } from '../../../../webview/src/app/data.service';

@NgModule({
  declarations: [AutosListComponent],
  exports: [AutosListComponent],
  imports: [
    CommonModule
	,HttpClientModule
	,NgbModule
  ],
  providers: [DataService],
})
export class AutosModule { }
