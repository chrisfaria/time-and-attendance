import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseService } from '../services/firebase.service';

export interface DialogData {
  count: number;
  delete: any;
}

@Component({
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent implements OnInit {

  private gridApi;
  private gridColumnApi;

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

  constructor(private firebaseService: FirebaseService, public dialog: MatDialog) { }

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

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
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

  onRemoveSelected() {
    var selectedData = this.gridApi.getSelectedRows();
    if(selectedData.length > 0) {
      console.warn(selectedData);

      const dialogRef = this.dialog.open(IncidentDeleteDialog,{
        //width: '250px',
        data: {count: selectedData.length}
      });
      
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          selectedData.forEach(element => {
            console.log('attempting to delete :' + element.id);
            this.deleteIncident(element.id);
          });
        } else {
          console.log('deletion cancelled');
        }
      });
    }
  }

  updateIncident(id, incident)
  {
    this.firebaseService
      .updateIncident(id,incident)
      .then(resp => {
        console.log(resp);
      })
      .catch(error => {
        console.warn(error);
      });
  }

  deleteIncident(id)
  {
    this.firebaseService
      .deleteIncident(id)
      .then(resp => {
        console.log(resp);
      })
      .catch(error => {
        console.warn(error);
      });
  }
}

@Component({
  selector: 'incident-delete-dialog',
  templateUrl: 'incident-delete-dialog.html',
})
export class IncidentDeleteDialog {
  
  constructor(
    public dialogRef: MatDialogRef<IncidentDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData)
     {}

  onNoDelClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmDelClick(): void {
    this.dialogRef.close(true);
  }

}