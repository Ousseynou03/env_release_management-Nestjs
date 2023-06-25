import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasTestDialogComponent } from './cas-test-dialog.component';

describe('CasTestDialogComponent', () => {
  let component: CasTestDialogComponent;
  let fixture: ComponentFixture<CasTestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasTestDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasTestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
