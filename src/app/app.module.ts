import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncidentComponent } from './incident/incident.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirebaseService } from "./services/firebase.service"
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    IncidentComponent
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
    MatDatepickerModule, MatNativeDateModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
