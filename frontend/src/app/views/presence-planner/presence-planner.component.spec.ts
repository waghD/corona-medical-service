import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresencePlannerComponent } from './presence-planner.component';

describe('PrecencePlannerComponent', () => {
  let component: PresencePlannerComponent;
  let fixture: ComponentFixture<PresencePlannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PresencePlannerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresencePlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
