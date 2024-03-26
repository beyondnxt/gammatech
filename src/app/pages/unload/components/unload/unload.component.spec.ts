import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloadComponent } from './unload.component';

describe('UnloadComponent', () => {
  let component: UnloadComponent;
  let fixture: ComponentFixture<UnloadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnloadComponent]
    });
    fixture = TestBed.createComponent(UnloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
