import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRequestManagerComponent } from './driver-request-manager.component';

describe('DriverRequestManagerComponent', () => {
  let component: DriverRequestManagerComponent;
  let fixture: ComponentFixture<DriverRequestManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverRequestManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverRequestManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
