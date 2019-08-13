import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor( private afs: AngularFirestore ) { }

  createIncident(data) {
    return new Promise<any>((resolve, reject) =>{
        this.afs
            .collection("incidents")
            .add(data)
            .then(res => {}, err => reject(err));
    });
  }

  getIncidents() {
    return new Promise<any>((resolve, reject) =>{
        this.afs
            .collection('incidents')
            .snapshotChanges();
    });
  }

  get_Incidents() {
    return this.afs
      .collection('incidents')
      .snapshotChanges();
  }

  create_Incident(record) {
    return this.afs
      .collection('incidents')
      .add(record);
  }

  update_Incident(recordID,record){
    this.afs
      .doc('incidents/' + recordID)
      .update(record);
  }

  delete_Incident(record_id) {
    this.afs
      .doc('incidents/' + record_id)
      .delete();
  }
}
