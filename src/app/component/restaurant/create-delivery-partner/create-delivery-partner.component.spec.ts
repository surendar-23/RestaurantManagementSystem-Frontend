import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeliveryPartnerComponent } from './create-delivery-partner.component';

describe('CreateDeliveryPartnerComponent', () => {
  let component: CreateDeliveryPartnerComponent;
  let fixture: ComponentFixture<CreateDeliveryPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDeliveryPartnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDeliveryPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
