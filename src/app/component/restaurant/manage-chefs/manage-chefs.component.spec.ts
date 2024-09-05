import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageChefsComponent } from './manage-chefs.component';

describe('ManageChefsComponent', () => {
  let component: ManageChefsComponent;
  let fixture: ComponentFixture<ManageChefsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageChefsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageChefsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
