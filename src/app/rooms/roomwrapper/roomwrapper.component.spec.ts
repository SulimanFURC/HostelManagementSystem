import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomwrapperComponent } from './roomwrapper.component';

describe('RoomwrapperComponent', () => {
  let component: RoomwrapperComponent;
  let fixture: ComponentFixture<RoomwrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomwrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomwrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
