import { Component, OnInit } from '@angular/core';
import { Incident } from '../../shared/models/incident';
import { FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.scss']
})
export class IncidentComponent implements OnInit {

  incidentForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    type: [''],
    values: this.fb.group({
      value1: [''],
      value2: [''],
      value3: ['']
    }),
    note: ['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.incidentForm.value);
  }

}
