import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecencePlannerComponent } from './precence-planner.component';

describe('PrecencePlannerComponent', () => {
  let component: PrecencePlannerComponent;
  let fixture: ComponentFixture<PrecencePlannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecencePlannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecencePlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
