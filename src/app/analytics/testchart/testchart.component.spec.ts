import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestchartComponent } from './testchart.component';

describe('TestchartComponent', () => {
  let component: TestchartComponent;
  let fixture: ComponentFixture<TestchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
