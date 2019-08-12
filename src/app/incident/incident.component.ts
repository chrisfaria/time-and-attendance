import { Component, OnInit } from '@angular/core';
import { Incident } from '../../shared/models/incident';
import { FirebaseService } from '../services/firebase.service'
import { FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';

export interface Name {
  value: string;
  viewValue: string;
}

export interface IncidentType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.scss']
})
export class IncidentComponent implements OnInit {

  today = new Date();
  testnote = true;
  valueLabel1 = '';
  valueLabel2 = '';

  names: Name[] = [
    {value: '001-Manpreet', viewValue: 'Manpreet'},
    {value: '001-Sidd', viewValue: 'Sidd'},
    {value: '001-Gaurav', viewValue: 'Gaurav'},
    {value: '001-Aatif', viewValue: 'Aatif'},
    {value: '001-Uzma', viewValue: 'Uzma'}
  ];

  types: IncidentType[] = [
    {value: '001-LateArrival', viewValue: 'Late arrival'},
    {value: '002-LeaveEarly', viewValue: 'Leave early'},
    {value: '003-Vacation', viewValue: 'Vacation'},
    {value: '004-SickDay', viewValue: 'Sick day'},
    {value: '005-AlteredSchedule', viewValue: 'Altered schedule'},
    {value: '006-LongLunch', viewValue: 'Long lunch'},
    {value: '007-WorkFromHome', viewValue: 'Work from home'},
    {value: '008-LieuDay', viewValue: 'Lieu day'},
    {value: '009-Overtime', viewValue: 'Overtime'},
    {value: '011-PersonalDay', viewValue: 'Personal day'},
    {value: '010-LeaveOfAbsence', viewValue: 'Leave of absence'},
    {value: '012-Note', viewValue: 'Note'},
    {value: '013-Event', viewValue: 'Event'}
  ];

  incidentForm = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    date: [this.today],
    time1: [''],
    time2: [''],
    hours: [''],
    days: [''],
    //date: [this.today, Validators.pattern('^(([1-9])|((1)[0-2]))(\/)([1-9]|[1-2][0-9]|(3)[0-1])(\/)\d{4}$')],
    //date: [this.today, Validators.pattern('^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1]).*$')],
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

  isTimeType()
  {
    if (this.incidentForm.value.type == '001-LateArrival' || 
        this.incidentForm.value.type == '002-LeaveEarly')
    {
      this.valueLabel1 = 'Time'
      return true;
    }
    return false;
  }

  isStartEndTimeType()
  {
    if (this.incidentForm.value.type == '005-AlteredSchedule')
    {
      this.valueLabel1 = 'Start Time'
      this.valueLabel1 = 'End Time'
      return true;
    }
    return false;
  }

  isHoursType()
  {
    if (this.incidentForm.value.type == '006-LongLunch')
    {
      this.valueLabel1 = 'Hours'
      return true;
    }
    return false;
  }

  isDaysType()
  {
    if (this.incidentForm.value.type == '003-Vacation' ||
        this.incidentForm.value.type == '004-SickDay' ||
        this.incidentForm.value.type == '007-WorkFromHome' ||
        this.incidentForm.value.type == '008-LieuDay' ||
        this.incidentForm.value.type == '009-Overtime' ||
        this.incidentForm.value.type == '011-PersonalDay' ||
        this.incidentForm.value.type == '010-LeaveOfAbsence')
    {
      this.valueLabel1 = 'Days'
      return true;
    }
    return false;
  }
}
