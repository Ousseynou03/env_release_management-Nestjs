import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomalieDialogComponent } from './anomalie-dialog.component';

describe('AnomalieDialogComponent', () => {
  let component: AnomalieDialogComponent;
  let fixture: ComponentFixture<AnomalieDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnomalieDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnomalieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
