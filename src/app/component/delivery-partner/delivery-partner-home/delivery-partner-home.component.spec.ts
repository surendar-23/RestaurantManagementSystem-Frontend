import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPartnerHomeComponent } from './delivery-partner-home.component';

describe('DeliveryPartnerHomeComponent', () => {
  let component: DeliveryPartnerHomeComponent;
  let fixture: ComponentFixture<DeliveryPartnerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryPartnerHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryPartnerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
