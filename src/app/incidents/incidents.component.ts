import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

export interface IncidentType {
  value: string;
  viewValue: string;
}

@Component({
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent implements OnInit {

  incidents: any;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getIncidents().subscribe(data => {
      this.incidents = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          date: e.payload.doc.data()['date'],
          type: e.payload.doc.data()['type'],
          note: e.payload.doc.data()['note'],
        };
      })
      console.log(this.incidents);
    });
  }
}
