import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeltaIndicatorComponent } from './delta-indicator.component';

describe('DeltaIndicatorComponent', () => {
  let component: DeltaIndicatorComponent;
  let fixture: ComponentFixture<DeltaIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeltaIndicatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeltaIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
