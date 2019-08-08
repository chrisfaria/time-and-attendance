import { Component, OnInit } from '@angular/core';
import { Incident } from '../../shared/models/incident';
import { FirebaseService } from '../services/firebase.service'
import { FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.scss']
})
export class IncidentComponent implements OnInit {

  today = new Date();

  incidentForm = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    //type: ['', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
    //type: ['', Validators.pattern('/^(((0[1-9]|[12]\d|3[01])-(0[13578]|1[02])-((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)-(0[13456789]|1[012])-((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])-02-((19|[2-9]\d)\d{2}))|(29-02-((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/')],
    date: [this.today],
    //date: [this.today, Validators.pattern('^(([1-9])|((1)[0-2]))(\/)([1-9]|[1-2][0-9]|(3)[0-1])(\/)\d{4}$')],
    //date: [this.today, Validators.pattern('^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1]).*$')],
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
