import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerTableComponent } from './scanner-table.component';

describe('ScannerTableComponent', () => {
  let component: ScannerTableComponent;
  let fixture: ComponentFixture<ScannerTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScannerTableComponent]
    });
    fixture = TestBed.createComponent(ScannerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
