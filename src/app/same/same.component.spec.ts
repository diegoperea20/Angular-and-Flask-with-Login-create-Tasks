import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SameComponent } from './same.component';

describe('SameComponent', () => {
  let component: SameComponent;
  let fixture: ComponentFixture<SameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SameComponent]
    });
    fixture = TestBed.createComponent(SameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
