import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanersAdminComponent } from './cleaners-admin.component';

describe('CleanersAdminComponent', () => {
  let component: CleanersAdminComponent;
  let fixture: ComponentFixture<CleanersAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanersAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanersAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
