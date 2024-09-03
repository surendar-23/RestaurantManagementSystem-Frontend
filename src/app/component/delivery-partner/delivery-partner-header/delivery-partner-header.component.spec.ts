import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPartnerHeaderComponent } from './delivery-partner-header.component';

describe('DeliveryPartnerHeaderComponent', () => {
  let component: DeliveryPartnerHeaderComponent;
  let fixture: ComponentFixture<DeliveryPartnerHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryPartnerHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryPartnerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
