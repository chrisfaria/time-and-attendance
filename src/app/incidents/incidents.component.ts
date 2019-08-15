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

  columnDefs = [
    {headerName: 'Date', field: 'date' },
    {headerName: 'Name', field: 'name' },
    {headerName: 'Type', field: 'type'},
    {headerName: 'Days', field: 'days'},
    {headerName: 'Hours', field: 'hours'},
    {headerName: 'Time 1', field: 'time1'},
    {headerName: 'Time 2', field: 'time2'},
    {headerName: 'Note', field: 'note'}
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getIncidents().subscribe(data => {
      this.incidents = data.map(e => {
        return {
          id: e.payload.doc.id,
          date: e.payload.doc.data()['date'],
          name: e.payload.doc.data()['name'],
          type: e.payload.doc.data()['type'],
          days: e.payload.doc.data()['days'],
          hours: e.payload.doc.data()['hours'],
          time1: e.payload.doc.data()['time1'],
          time2: e.payload.doc.data()['time2'],
          note: e.payload.doc.data()['note']
        };
      })
      console.log(this.incidents);
    });
  }
}
