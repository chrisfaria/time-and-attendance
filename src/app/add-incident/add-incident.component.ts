import { Component, OnInit } from '@angular/core';
import { Incident } from '../../shared/models/incident';
import { FirebaseService } from '../services/firebase.service'
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

export interface Name {
  value: string;
  viewValue: string;
}

export interface IncidentType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.scss']
})
export class AddIncidentComponent implements OnInit {

  today = new Date();
  testnote = true;
  valueLabel1 = '';
  valueLabel2 = '';
  
  incidents: any;
  teams: any;
  incidentTypes: any;

  addIncidentForm = this.fb.group({
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
    this.firebaseService.getTeams().subscribe(data => {
      this.teams = data.map(r => {
        return {
          id: r.payload.doc.id,
          name: r.payload.doc.data()['name'],
        };
      })
    });
    this.firebaseService.getIncidentTypes().subscribe(data => {
      this.incidentTypes = data.map(r => {
        return {
          id: r.payload.doc.id,
          name: r.payload.doc.data()['name'],
        };
      })
    });
  }

  onClickAddIncident() {
    // make the incident date a string informat 'YYYY-MM-DD'
    this.addIncidentForm.value.date = moment(this.addIncidentForm.value.date).format('YYYY-MM-DD')

    // add the types so that the ag-grid listing of incidents
    // can be selected via drop down depending on what type
    //this.addIncidentForm.value.name = { value: this.addIncidentForm.value.name, type: 'name'};
    //this.addIncidentForm.value.type = { value: this.addIncidentForm.value.type, type: 'type'};

    console.log(this.addIncidentForm.value);

    this.createIncident(this.addIncidentForm.value);
  }

  onClickTest() {
    //this.initializeTestData();
    console.log(this.addIncidentForm.value);
    this.addIncidentForm.value.name = { value: this.addIncidentForm.value.name, type: 'name'};
    console.log(this.addIncidentForm.value);
  }

  isTimeType()
  {
    if (this.addIncidentForm.value.type == 'Late arrival' || 
        this.addIncidentForm.value.type == 'Leave early')
    {
      this.valueLabel1 = 'Time'
      return true;
    }
    return false;
  }

  isStartEndTimeType()
  {
    if (this.addIncidentForm.value.type == 'Altered schedule')
    {
      this.valueLabel1 = 'Start Time'
      this.valueLabel2 = 'End Time'
      return true;
    }
    return false;
  }

  isHoursType()
  {
    if (this.addIncidentForm.value.type == 'Long lunch')
    {
      this.valueLabel1 = 'Hours'
      return true;
    }
    return false;
  }

  isDaysType()
  {
    if (this.addIncidentForm.value.type == 'Vacation' ||
        this.addIncidentForm.value.type == 'Sick day' ||
        this.addIncidentForm.value.type == 'Work from home' ||
        this.addIncidentForm.value.type == 'Lieu day' ||
        this.addIncidentForm.value.type == 'Overtime' ||
        this.addIncidentForm.value.type == 'Personal day' ||
        this.addIncidentForm.value.type == 'Leave of absence')
    {
      this.valueLabel1 = 'Days'
      return true;
    }
    return false;
  }

  createIncident(incident)
  {
    this.firebaseService
      .createIncident(incident)
      .then(resp => {
        console.log(resp);
      })
      .catch(error => {
        console.warn(error);
      });
  }

  initializeTestData()
  {
    this.createIncident(<Incident> {
      name: 'Rosie',
      date: '2019-01-19',
      type: 'Late arrival',
      days: 0,
      hours: 0,
      time1: '9:56 am',
      time2: '',
      note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
       });
       
       this.createIncident(<Incident> {
      name: 'Rosie',
      date: '2019-03-08',
      type: 'Late arrival',
      days: 0,
      hours: 0,
      time1: '9:45 am',
      time2: '',
      note: 'Ultrices sagittis orci a scelerisque purus semper eget duis at.'
      });
       
       this.createIncident(<Incident> {
      name: 'Rosie',
      date: '2019-03-09',
      type: 'Late arrival',
      days: 0,
      hours: 0,
      time1: '9:35 am',
      time2: '',
      note: 'Orci eu lobortis elementum nibh.'
      });
       
       this.createIncident(<Incident> {
      name: 'Homer',
      date: '2019-07-03',
      type: 'Long lunch',
      days: 0,
      hours: 2,
      time1: '',
      time2: '',
      note: ''
      });
       
       this.createIncident(<Incident> {
      name: 'Jim',
      date: '2019-07-05',
      type: 'Sick day',
      days: 5,
      hours: 0,
      time1: '',
      time2: '',
      note: 'Pharetra sit amet aliquam id diam maecenas ultricies.'
      });
       
       this.createIncident(<Incident> {
      name: 'Homer',
      date: '2019-07-05',
      type: 'Altered schedule',
      days: 0,
      hours: 0,
      time1: '7:00 am',
      time2: '3:00 pm',
      note: 'Pellentesque id nibh tortor id aliquet lectus proin nibh.'
      });
       
       this.createIncident(<Incident> {
      name: 'Rosie',
      date: '2019-07-18',
      type: 'Work from home',
      days: 1,
      hours: 0,
      time1: '',
      time2: '',
      note: 'Sit amet est placerat in egestas erat imperdiet sed euismod.'
      });
       
       this.createIncident(<Incident> {
      name: 'Homer',
      date: '2019-07-08',
      type: 'Altered schedule',
      days: 0,
      hours: 0,
      time1: '7:00 am',
      time2: '3:30 pm',
      note: 'Sem et tortor consequat id porta nibh venenatis cras sed.'
      });
       
       this.createIncident(<Incident> {
      name: 'Jim',
      date: '2019-07-20',
      type: 'Late arrival',
      days: 0,
      hours: 0,
      time1: '9:15 am',
      time2: '',
      note: 'Tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus.'
      });
       
       this.createIncident(<Incident> {
      name: 'Homer',
      date: '2019-07-21',
      type: 'Late arrival',
      days: 0,
      hours: 0,
      time1: '10:49 am',
      time2: '',
      note: 'Auctor augue mauris augue neque gravida in fermentum et sollicitudin.'
      });
       
       this.createIncident(<Incident> {
      name: 'Rosie',
      date: '2019-08-01',
      type: 'Work from home',
      days: 1,
      hours: 0,
      time1: '',
      time2: '',
      note: 'Nisi quis eleifend quam adipiscing vitae proin sagittis.'
      });
       
       this.createIncident(<Incident> {
      name: 'Jim',
      date: '2019-08-05',
      type: 'Sick day',
      days: 1,
      hours: 0,
      time1: '',
      time2: '',
      note: 'Odio pellentesque diam volutpat commodo sed egestas egestas fringilla.'
      });
       
       this.createIncident(<Incident> {
      name: 'Jim',
      date: '2019-08-06',
      type: 'Sick day',
      days: 1,
      hours: 0,
      time1: '',
      time2: '',
      note: 'Turpis egestas pretium aenean pharetra magna ac placerat vestibulum.'
      });
       
       this.createIncident(<Incident> {
      name: 'Jim',
      date: '2019-08-07',
      type: 'Sick day',
      days: 1,
      hours: 0,
      time1: '',
      time2: '',
      note: 'Condimentum vitae sapien pellentesque habitant morbi tristique senectus et.'
      });
       
       this.createIncident(<Incident> {
      name: 'Rosie',
      date: '2019-08-10',
      type: 'Late arrival',
      days: 0,
      hours: 0,
      time1: '10:13 am',
      time2: '',
      note: 'Posuere ac ut consequat semper.'
      });
       
       this.createIncident(<Incident> {
      name: 'Homer',
      date: '2019-08-03',
      type: 'Event',
      days: 0,
      hours: 0,
      time1: '',
      time2: '',
      note: 'Mauris pharetra et ultrices neque ornare aenean euismod elementum nisi.'
      });
       
       this.createIncident(<Incident> {
      name: 'Jim',
      date: '2019-08-015',
      type: 'Vacation',
      days: 1,
      hours: 0,
      time1: '',
      time2: '',
      note: 'Eu non diam phasellus vestibulum lorem sed risus.'
      });
       
       this.createIncident(<Incident> {
      name: 'Jim',
      date: '2019-06-01',
      type: 'Vacation',
      days: 9,
      hours: 0,
      time1: '',
      time2: '',
      note: 'Volutpat consequat mauris nunc congue nisi vitae suscipit tellus.'
      });
       
       this.createIncident(<Incident> {
      name: 'Rosie',
      date: '2019-08-18',
      type: 'Late arrival',
      days: 0,
      hours: 0,
      time1: '9:44 am',
      time2: '',
      note: 'Me me me me me me'
      });
      
  }
}
