import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncidentsComponent } from './incidents/incidents.component';
import { ReportingComponent } from './reporting/reporting.component';

const routes: Routes = [
  { path: 'reporting', component: ReportingComponent },
  { path: 'incidents', component: IncidentsComponent},
  { path: '', redirectTo: 'incidents', pathMatch: 'full'},
  { path: '**', redirectTo: 'incidents', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
