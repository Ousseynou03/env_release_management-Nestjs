import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailScenarioDialogComponent } from './detail-scenario-dialog.component';

describe('DetailScenarioDialogComponent', () => {
  let component: DetailScenarioDialogComponent;
  let fixture: ComponentFixture<DetailScenarioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailScenarioDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailScenarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
