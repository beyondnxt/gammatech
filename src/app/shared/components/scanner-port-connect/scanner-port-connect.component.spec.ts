import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerPortConnectComponent } from './scanner-port-connect.component';

describe('ScannerPortConnectComponent', () => {
  let component: ScannerPortConnectComponent;
  let fixture: ComponentFixture<ScannerPortConnectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScannerPortConnectComponent]
    });
    fixture = TestBed.createComponent(ScannerPortConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
