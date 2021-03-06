import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutosModule } from './autos/autos.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../../webview/src/app/data.service';
import { HogarModule } from './hogar/hogar.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutosModule,
    HogarModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
