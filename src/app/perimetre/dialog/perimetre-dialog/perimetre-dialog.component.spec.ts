import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerimetreDialogComponent } from './perimetre-dialog.component';

describe('PerimetreDialogComponent', () => {
  let component: PerimetreDialogComponent;
  let fixture: ComponentFixture<PerimetreDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerimetreDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerimetreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
