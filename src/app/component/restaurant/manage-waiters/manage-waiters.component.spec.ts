import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWaitersComponent } from './manage-waiters.component';

describe('ManageWaitersComponent', () => {
  let component: ManageWaitersComponent;
  let fixture: ComponentFixture<ManageWaitersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageWaitersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageWaitersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
