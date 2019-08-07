import { Component, OnInit } from '@angular/core';
import { Incident } from '../../shared/models/incident';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.scss']
})
export class IncidentComponent implements OnInit {
  incident: Incident = {
    id: 1,
    name: 'Windstorm'
  };

  incidentForm = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl(''),
    type: new FormControl(''),
    values: new FormGroup({
      value1: new FormControl(''),
      value2: new FormControl(''),
      value3: new FormControl('')
    }),
    note: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.incidentForm.value);
  }

}
