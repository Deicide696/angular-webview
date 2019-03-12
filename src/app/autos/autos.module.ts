import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AutosListComponent } from './autos-list/autos-list.component';
import { DataService } from '../../../../webview/src/app/data.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AutosManualComponent } from './autos-manual/autos-manual.component';

@NgModule({
  declarations: [AutosListComponent, AutosManualComponent],
  exports: [AutosListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [DataService],
})
export class AutosModule { }
