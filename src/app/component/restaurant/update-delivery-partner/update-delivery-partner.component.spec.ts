import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeliveryPartnerComponent } from './update-delivery-partner.component';

describe('UpdateDeliveryPartnerComponent', () => {
  let component: UpdateDeliveryPartnerComponent;
  let fixture: ComponentFixture<UpdateDeliveryPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDeliveryPartnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDeliveryPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
