import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutosRowListComponent } from './autos-row-list.component';

describe('AutosRowListComponent', () => {
  let component: AutosRowListComponent;
  let fixture: ComponentFixture<AutosRowListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutosRowListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutosRowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
