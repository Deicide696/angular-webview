import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutosListComponent } from './autos/autos-list/autos-list.component';

const routes: Routes = [
  { path: 'precotizacion/:precotizacion',  component: AutosListComponent },
  /** router error */
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
