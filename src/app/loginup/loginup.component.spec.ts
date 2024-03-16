import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginupComponent } from './loginup.component';

describe('LoginupComponent', () => {
  let component: LoginupComponent;
  let fixture: ComponentFixture<LoginupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginupComponent]
    });
    fixture = TestBed.createComponent(LoginupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
