import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPageComponent } from './forget-page.component';

describe('ForgetPageComponent', () => {
  let component: ForgetPageComponent;
  let fixture: ComponentFixture<ForgetPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgetPageComponent]
    });
    fixture = TestBed.createComponent(ForgetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
