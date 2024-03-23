import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToteboxComponent } from './totebox.component';

describe('ToteboxComponent', () => {
  let component: ToteboxComponent;
  let fixture: ComponentFixture<ToteboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToteboxComponent]
    });
    fixture = TestBed.createComponent(ToteboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
