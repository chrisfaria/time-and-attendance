import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AnalyticsModule } from './analytics/analytics.module';
import { AddIncidentComponent } from './add-incident/add-incident.component';
import { IncidentsComponent, IncidentDeleteDialog } from './incidents/incidents.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { AgGridModule } from 'ag-grid-angular';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirebaseService } from "./services/firebase.service"
import { environment } from '../environments/environment';
  
@NgModule({
  declarations: [
    AppComponent,
    AddIncidentComponent,
    IncidentsComponent,
    IncidentDeleteDialog,
  ],
  entryComponents: [
    IncidentDeleteDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
 	  AngularFirestoreModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatDatepickerModule, MatNativeDateModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    NgxMaterialTimepickerModule,
    AgGridModule.withComponents([]),
    AnalyticsModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
