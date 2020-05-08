import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverListComponent } from './driver-list.component';
import { instance, reset } from 'ts-mockito';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
describe('DriverListComponent', () => {
  let component: DriverListComponent;
  let fixture: ComponentFixture<DriverListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ DriverListComponent ],
      providers: [{
        provide: MatDialog,
        useValue: instanceof (MockedMatDialog)
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    reset(MockedMatDialog);
  });
});
