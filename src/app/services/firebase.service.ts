import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor( private firestore: AngularFirestore ) { }

  createIncident(data) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("incidents")
            .add(data)
            .then(res => {}, err => reject(err));
    });
}
}
