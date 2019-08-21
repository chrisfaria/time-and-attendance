import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncidentsComponent } from './incidents/incidents.component';
import { TestchartComponent } from './analytics/testchart/testchart.component'

const routes: Routes = [
  { path: 'analytics', component: TestchartComponent },
  { path: 'incidents', component: IncidentsComponent},
  { path: '', redirectTo: 'incidents', pathMatch: 'full'},
  { path: '**', redirectTo: 'incidents', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
