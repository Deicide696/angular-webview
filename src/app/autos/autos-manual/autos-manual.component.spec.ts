import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutosManualComponent } from './autos-manual.component';

describe('AutosManualComponent', () => {
  let component: AutosManualComponent;
  let fixture: ComponentFixture<AutosManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutosManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutosManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
