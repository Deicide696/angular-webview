import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutosListComponent } from './autos/autos-list/autos-list.component';
import {HogarListComponent} from './hogar/hogar-list/hogar-list.component';

const routes: Routes = [
  { path: 'precotizacion/:precotizacion',  component: AutosListComponent },
  { path: 'hogar/:precotizacion',  component: HogarListComponent },
  /** router error */
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
