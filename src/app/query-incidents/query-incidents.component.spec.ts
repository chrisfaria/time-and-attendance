import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryIncidentsComponent } from './query-incidents.component';

describe('QueryIncidentsComponent', () => {
  let component: QueryIncidentsComponent;
  let fixture: ComponentFixture<QueryIncidentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryIncidentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
