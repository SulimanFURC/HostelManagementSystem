import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentWrapperComponent } from './rent-wrapper.component';

describe('RentWrapperComponent', () => {
  let component: RentWrapperComponent;
  let fixture: ComponentFixture<RentWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
