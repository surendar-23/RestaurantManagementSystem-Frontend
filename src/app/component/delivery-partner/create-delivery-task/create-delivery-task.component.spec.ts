import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CreateDeliveryTaskComponent} from './create-delivery-task.component';
import {ReactiveFormsModule} from '@angular/forms';

describe('CreateDeliveryTaskComponent', () => {
    let component: CreateDeliveryTaskComponent;
    let fixture: ComponentFixture<CreateDeliveryTaskComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateDeliveryTaskComponent, ReactiveFormsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(CreateDeliveryTaskComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form should be invalid when empty', () => {
        expect(component.deliveryForm.valid).toBeFalsy();
    });

    it('form should be valid when filled', () => {
        component.deliveryForm.controls['deliveryTime'].setValue('2024-09-03T10:00');
        component.deliveryForm.controls['street'].setValue('123 Main St');
        component.deliveryForm.controls['city'].setValue('Anytown');
        component.deliveryForm.controls['state'].setValue('State');
        component.deliveryForm.controls['postalCode'].setValue('12345');
        component.deliveryForm.controls['status'].setValue('Pending');
        component.deliveryForm.controls['orderId'].setValue(1);
        component.deliveryForm.controls['deliveryPartnerId'].setValue(1);

        expect(component.deliveryForm.valid).toBeTruthy();
    });
});
