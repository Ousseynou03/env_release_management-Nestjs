import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioTestDialogComponent } from './scenario-test-dialog.component';

describe('ScenarioTestDialogComponent', () => {
  let component: ScenarioTestDialogComponent;
  let fixture: ComponentFixture<ScenarioTestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioTestDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioTestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
