import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedhelpComponent } from './needhelp.component';

describe('NeedhelpComponent', () => {
  let component: NeedhelpComponent;
  let fixture: ComponentFixture<NeedhelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedhelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedhelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
