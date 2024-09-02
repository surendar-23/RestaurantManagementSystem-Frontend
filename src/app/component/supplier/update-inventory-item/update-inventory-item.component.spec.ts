import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UpdateInventoryItemComponent} from './update-inventory-item.component';
import {SupplierService} from "../../services/supplier.service";
import {of} from 'rxjs';

describe('UpdateInventoryItemComponent', () => {
    let component: UpdateInventoryItemComponent;
    let fixture: ComponentFixture<UpdateInventoryItemComponent>;
    let supplierService: SupplierService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            declarations: [UpdateInventoryItemComponent],
            providers: [SupplierService],
        }).compileComponents();

        fixture = TestBed.createComponent(UpdateInventoryItemComponent);
        component = fixture.componentInstance;
        supplierService = TestBed.inject(SupplierService);
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should load inventory item details when inventoryItemId is entered', () => {
        const item = {id: 1, name: 'Test Item', quantity: 10};
        spyOn(supplierService, 'getInventoryItemById').and.returnValue(of(item));

        component.inventoryItemForm.get('inventoryItemId')?.setValue(1);
        expect(component.inventoryItemForm.get('name')?.value).toEqual('Test Item');
        expect(component.inventoryItemForm.get('quantity')?.value).toEqual(10);
    });

    it('should call updateInventoryItem on form submit', () => {
        const service = TestBed.inject(SupplierService);
        spyOn(service, 'updateInventoryItem').and.callThrough();

        component.inventoryItemForm.setValue({
            inventoryItemId: 1,
            name: 'Test Item',
            quantity: 10,
        });

        component.onSubmit();
        expect(service.updateInventoryItem).toHaveBeenCalledWith({
            inventoryItemId: 1,
            name: 'Test Item',
            quantity: 10,
        }, 1);
    });
});
