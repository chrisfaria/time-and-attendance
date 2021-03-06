import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor( private afs: AngularFirestore ) { }

  getIncidents() {
    return this.afs
      .collection('incidents')
      .snapshotChanges();
  }

  createIncident(record) {
    return this.afs
      .collection('incidents')
      .add(record);
  }

  updateIncident(recordID,record){
    return this.afs
      .doc('incidents/' + recordID)
      .update(record);
  }

  deleteIncident(record_id) {
    return this.afs
      .doc('incidents/' + record_id)
      .delete();
  }

  getTeams() {
    return this.afs
      .collection('team')
      .snapshotChanges();
  }

  getIncidentTypes() {
    return this.afs
      .collection('incident-types')
      .snapshotChanges();
  }
}
