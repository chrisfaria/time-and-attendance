import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent implements OnInit {

  incidents: any;
  showAdd: any = false;
  showAddText: any = "Show Add Incident";

  columnDefs = [
    {headerName: 'Date', field: 'date', editable: true,  sortable: true, filter: true, resizable: true, width: 120, sort: "desc"},
    {headerName: 'Name', field: 'name', editable: true,  sortable: true, filter: true, resizable: true, width: 120, 
      /*cellEditorSelector:function (params){
        if (params.data.type === 'name') return {
            component: 'agRichSelectCellEditor',
            params: {values: ['Name1', 'Name2']}
        };
      }*/
    },
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

  OnClickShowAdd() {
    this.showAdd = !this.showAdd;

    if (this.showAdd == false) {
      this.showAddText = "Show Add Incident";
    }
    else {
      this.showAddText = "Hide Add Incident";
    }
  }

  onCellValueChanged(event) {
    // handle the rest here

    console.warn(event.data.id);
    this.updateIncident(event.data.id, event.data)
  }

  updateIncident(id, incident)
  {
    this.firebaseService
      .updateIncident(id,incident)
      .then(resp => {
        console.log(resp);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
