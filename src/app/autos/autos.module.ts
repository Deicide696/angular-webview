import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AutosListComponent } from './autos-list/autos-list.component';
import { DataService } from '../../../../webview/src/app/data.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AutosManualComponent } from './autos-manual/autos-manual.component';
import { AutosRowListComponent } from './autos-row-list/autos-row-list.component';
import {QuoteDirective} from './quote.directive';
import { ListaComponent } from './lista/lista.component';

@NgModule({
  declarations: [
      AutosListComponent,
      AutosManualComponent,
      AutosRowListComponent,
      QuoteDirective,
      ListaComponent
  ],
  exports: [AutosListComponent, AutosRowListComponent, AutosManualComponent, ListaComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule
  ],
    providers: [DataService],
    entryComponents: [
        AutosListComponent,
        AutosManualComponent,
        AutosRowListComponent
    ]
})
export class AutosModule { }
