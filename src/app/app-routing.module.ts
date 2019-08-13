import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddIncidentComponent } from './add-incident/add-incident.component';
import { IncidentsComponent } from './incidents/incidents.component';

const routes: Routes = [
  { path: 'add', component: AddIncidentComponent },
  { path: 'incidents', component: IncidentsComponent},
  { path: '', redirectTo: 'add', pathMatch: 'full'},
  { path: '**', redirectTo: 'add', pathMatch: 'full'},
  //{ path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
