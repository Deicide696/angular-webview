import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HogarListComponent } from './hogar-list.component';

describe('HogarListComponent', () => {
  let component: HogarListComponent;
  let fixture: ComponentFixture<HogarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HogarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HogarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
