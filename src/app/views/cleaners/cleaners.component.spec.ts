import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanersComponent } from './cleaners.component';

describe('CleanersComponent', () => {
  let component: CleanersComponent;
  let fixture: ComponentFixture<CleanersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
