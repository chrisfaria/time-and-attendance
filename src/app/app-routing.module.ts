import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddIncidentComponent } from './add-incident/add-incident.component';
import { IncidentsComponent } from './incidents/incidents.component';

const routes: Routes = [
  { path: 'analytics', component: AddIncidentComponent },
  { path: 'incidents', component: IncidentsComponent},
  { path: '', redirectTo: 'incidents', pathMatch: 'full'},
  { path: '**', redirectTo: 'incidents', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
