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
    //this.initializeData();
    console.log(this.addIncidentForm.value);
    this.addIncidentForm.value.name = { value: this.addIncidentForm.value.name, type: 'name'};
    console.log(this.addIncidentForm.value);
  }

  isTimeType()
  {
    if (this.addIncidentForm.value.type == '001-LateArrival' || 
        this.addIncidentForm.value.type == '002-LeaveEarly')
    {
      this.valueLabel1 = 'Time'
      return true;
    }
    return false;
  }

  isStartEndTimeType()
  {
    if (this.addIncidentForm.value.type == '005-AlteredSchedule')
    {
      this.valueLabel1 = 'Start Time'
      this.valueLabel1 = 'End Time'
      return true;
    }
    return false;
  }

  isHoursType()
  {
    if (this.addIncidentForm.value.type == '006-LongLunch')
    {
      this.valueLabel1 = 'Hours'
      return true;
    }
    return false;
  }

  isDaysType()
  {
    if (this.addIncidentForm.value.type == '003-Vacation' ||
        this.addIncidentForm.value.type == '004-SickDay' ||
        this.addIncidentForm.value.type == '007-WorkFromHome' ||
        this.addIncidentForm.value.type == '008-LieuDay' ||
        this.addIncidentForm.value.type == '009-Overtime' ||
        this.addIncidentForm.value.type == '011-PersonalDay' ||
        this.addIncidentForm.value.type == '010-LeaveOfAbsence')
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

  initializeData()
  {
    // const initInci = <Incident> {
    //   name: "Aatif",
    //   date: "Jan-7-2019",
    //   type: "Late",
    //   days: 0,
    //   hours: 0,
    //   time1: "9:35pm",
    //   time2: "",
    //   note: "Pick up bart",
    // }

    this.createIncident(<Incident> {
      name: 'Aatif',
      date: '2019-01-19',
      type: '001-LateArrival',
      days: 0,
      hours: 0,
      time1: '9:56 am',
      time2: '',
      note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
       });
       
       this.createIncident(<Incident> {
      name: 'Aatif',
      date: '2019-03-08',
      type: '001-LateArrival',
      days: 0,
      hours: 0,
      time1: '9:45 am',
      time2: '',
      note: 'Ultrices sagittis orci a scelerisque purus semper eget duis at.'
      });
       
       this.createIncident(<Incident> {
      name: 'Aatif',
      date: '2019-03-09',
      type: '001-LateArrival',
      days: 0,
      hours: 0,
      time1: '9:35 am',
      time2: '',
      note: 'Orci eu lobortis elementum nibh.'
      });
       
       this.createIncident(<Incident> {
      name: 'Manpreet',
      date: '2019-07-03',
      type: '006-LongLunch',
      days: 0,
      hours: 2,
      time1: '',
      time2: '',
      note: ''
      });
       
       this.createIncident(<Incident> {
      name: 'Uzma',
      date: '2019-07-05',
      type: '004-SickDay',
      days: 5,
      hours: 0,
      time1: '',
      time2: '',
      note: 'Pharetra sit amet aliquam id diam maecenas ultricies.'
      });
       
       this.createIncident(<Incident> {
      name: 'Manpreet',
      date: '2019-07-05',
      type: '005-AlteredSchedule',
      days: 0,
      hours: 0,
      time1: '7:00 am',
      time2: '3:00 pm',
      note: 'Pellentesque id nibh tortor id aliquet lectus proin nibh.'
      });
       
       this.createIncident(<Incident> {
      name: 'Aatif',
      date: '2019-07-18',
      type: '007-WorkFromHome',
      days: 1,
      hours: 0,
      time1: '',
      time2: '',
      note: 'Sit amet est placerat in egestas erat imperdiet sed euismod.'
      });
       
       this.createIncident(<Incident> {
      name: 'Manpreet',
      date: '2019-07-08',
      type: '005-AlteredSchedule',
      days: 0,
      hours: 0,
      time1: '7:00 am',
      time2: '3:30 pm',
      note: 'Sem et tortor consequat id porta nibh venenatis cras sed.'
      });
       
       this.createIncident(<Incident> {
      name: 'Uzma',
      date: '2019-07-20',
      type: '001-LateArrival',
      days: 0,
      hours: 0,
      time1: '9:15 am',
      time2: '',
      note: 'Tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus.'
      });
       
       this.createIncident(<Incident> {
      name: 'Manpreet',
      date: '2019-07-21',
      type: '001-LateArrival',
      days: 0,
      hours: 0,
      time1: '10:49 am',
      time2: '',
      note: 'Auctor augue mauris augue neque gravida in fermentum et sollicitudin.'
      });
       
       this.createIncident(<Incident> {
      name: 'Aatif',
      date: '2019-08-01',
      type: '007-WorkFromHome',
      days: 1,
      hours: 0,
      time1: '',
      time2: '',
      note: 'Nisi quis eleifend quam adipiscing vitae proin sagittis.'
      });
       
       this.createIncident(<Incident> {
      name: 'Uzma',
      date: '2019-08-05',
      type: '004-SickDay',
      days: 1,
      hours: 0,
      time1: '',
      time2: '',
      note: 'Odio pellentesque diam volutpat commodo sed egestas egestas fringilla.'
      });
       
       this.createIncident(<Incident> {
      name: 'Uzma',
      date: '2019-08-06',
      type: '004-SickDay',
      days: 1,
      hours: 0,
      time1: '',
      time2: '',
      note: 'Turpis egestas pretium aenean pharetra magna ac placerat vestibulum.'
      });
       
       this.createIncident(<Incident> {
      name: 'Uzma',
      date: '2019-08-07',
      type: '004-SickDay',
      days: 1,
      hours: 0,
      time1: '',
      time2: '',
      note: 'Condimentum vitae sapien pellentesque habitant morbi tristique senectus et.'
      });
       
       this.createIncident(<Incident> {
      name: 'Aatif',
      date: '2019-08-10',
      type: '001-LateArrival',
      days: 0,
      hours: 0,
      time1: '10:13 am',
      time2: '',
      note: 'Posuere ac ut consequat semper.'
      });
       
       this.createIncident(<Incident> {
      name: 'Manpreet',
      date: '2019-08-03',
      type: '013-Event',
      days: 0,
      hours: 0,
      time1: '',
      time2: '',
      note: 'Mauris pharetra et ultrices neque ornare aenean euismod elementum nisi.'
      });
       
       this.createIncident(<Incident> {
      name: 'Uzma',
      date: '2019-08-015',
      type: '003-Vacation',
      days: 1,
      hours: 0,
      time1: '',
      time2: '',
      note: 'Eu non diam phasellus vestibulum lorem sed risus.'
      });
       
       this.createIncident(<Incident> {
      name: 'Uzma',
      date: '2019-06-01',
      type: '003-Vacation',
      days: 9,
      hours: 0,
      time1: '',
      time2: '',
      note: 'Volutpat consequat mauris nunc congue nisi vitae suscipit tellus.'
      });
       
       this.createIncident(<Incident> {
      name: 'Aatif',
      date: '2019-08-18',
      type: '001-LateArrival',
      days: 0,
      hours: 0,
      time1: '9:44 am',
      time2: '',
      note: 'Me me me me me me'
      });
      
  }
}
