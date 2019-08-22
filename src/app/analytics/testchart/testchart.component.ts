import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testchart',
  templateUrl: './testchart.component.html',
  styleUrls: ['./testchart.component.scss']
})
export class TestchartComponent implements OnInit {

  incidentData: any;
  options: any;

  constructor() {
    this.incidentData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'Second Dataset',
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
  }
  
  this.options = {
      title: {
          display: true,
          text: 'My Title',
          fontSize: 16
      },
      legend: {
          position: 'bottom'
      }
  };
  }

  ngOnInit() {
  }

}
