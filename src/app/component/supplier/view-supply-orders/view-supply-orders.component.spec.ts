import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSupplyOrdersComponent } from './view-supply-orders.component';

describe('ViewSupplyOrdersComponent', () => {
  let component: ViewSupplyOrdersComponent;
  let fixture: ComponentFixture<ViewSupplyOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSupplyOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSupplyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
