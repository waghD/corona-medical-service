import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpersAdminComponent } from './helpers-admin.component';

describe('HelpersAdminComponent', () => {
  let component: HelpersAdminComponent;
  let fixture: ComponentFixture<HelpersAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpersAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpersAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
