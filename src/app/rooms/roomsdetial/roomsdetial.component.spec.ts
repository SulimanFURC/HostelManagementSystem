import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsdetialComponent } from './roomsdetial.component';

describe('RoomsdetialComponent', () => {
  let component: RoomsdetialComponent;
  let fixture: ComponentFixture<RoomsdetialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomsdetialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsdetialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
