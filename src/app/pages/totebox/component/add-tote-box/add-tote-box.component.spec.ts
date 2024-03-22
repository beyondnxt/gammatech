import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToteBoxComponent } from './add-tote-box.component';

describe('AddToteBoxComponent', () => {
  let component: AddToteBoxComponent;
  let fixture: ComponentFixture<AddToteBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddToteBoxComponent]
    });
    fixture = TestBed.createComponent(AddToteBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
