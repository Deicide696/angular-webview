import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutosListComponent } from './autos/autos-list/autos-list.component';

const routes: Routes = [
	{ path: 'precotizacion/:precotizacion/:deployment',  component: AutosListComponent },
	{ path: '**', redirectTo: '/', pathMatch: 'full' }, //router error
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
