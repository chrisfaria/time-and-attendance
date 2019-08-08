import { Component, OnInit } from '@angular/core';
import { Incident } from '../../shared/models/incident';
import { FirebaseService } from '../services/firebase.service'
import { FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.scss']
})
export class IncidentComponent implements OnInit {

  incidentForm = this.fb.group({
    name: ['', Validators.required],
    type: [''],
    values: this.fb.group({
      value1: [''],
      value2: [''],
      value3: ['']
    }),
    details: this.fb.array([
      this.fb.control('')
    ]),
    note: ['']
  });

  constructor(private fb: FormBuilder, private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.incidentForm.value);
    this.firebaseService.createIncident(this.incidentForm.value)
         .then(res => {
             /*do something here....
             maybe clear the form or give a success message*/
         });
  }

  get details() {
    return this.incidentForm.get('details') as FormArray;
  }

  addDetail() {
    this.details.push(this.fb.control(''));
  }

}
