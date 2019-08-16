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
    {headerName: 'Date', field: 'date', editable: true,  sortable: true, filter: true, resizable: true, width: 120, sort: "desc"},
    {headerName: 'Name', field: 'name', editable: true,  sortable: true, filter: true, resizable: true, width: 120},
    {headerName: 'Type', field: 'type', editable: true,  sortable: true, filter: true, resizable: true, width: 160},
    {headerName: 'Days', field: 'days', editable: true,  sortable: true, filter: true, resizable: true, width: 80},
    {headerName: 'Hours', field: 'hours', editable: true,  sortable: true, filter: true, resizable: true, width: 80},
    {headerName: 'Time 1', field: 'time1', editable: true,  sortable: true, filter: true, resizable: true, width: 100},
    {headerName: 'Time 2', field: 'time2', editable: true,  sortable: true, filter: true, resizable: true, width: 100},
    {headerName: 'Note', field: 'note', editable: true,  sortable: true, filter: true, resizable: true, width: 515}
  ];

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getIncidents().subscribe(data => {
      this.incidents = data.map(r => {
        console.warn(r.payload.doc.data()['date']);
        return {
          id: r.payload.doc.id,
          date: r.payload.doc.data()['date'],
          name: r.payload.doc.data()['name'],
          type: r.payload.doc.data()['type'],
          days: r.payload.doc.data()['days'],
          hours: r.payload.doc.data()['hours'],
          time1: r.payload.doc.data()['time1'],
          time2: r.payload.doc.data()['time2'],
          note: r.payload.doc.data()['note']
        };
      })
    });
  }
}
