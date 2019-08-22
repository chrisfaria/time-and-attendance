import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { TestchartComponent } from './testchart/testchart.component';

@NgModule({
  declarations: [TestchartComponent],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [TestchartComponent]
})
export class AnalyticsModule { }
