import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningDetailComponent } from './planning-detail.component';

describe('PlanningDetailComponent', () => {
  let component: PlanningDetailComponent;
  let fixture: ComponentFixture<PlanningDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
