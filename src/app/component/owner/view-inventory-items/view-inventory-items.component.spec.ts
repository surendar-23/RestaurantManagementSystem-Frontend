import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ManageInventoryItemsComponent} from './view-inventory-items.component';

describe('ViewInventoryItemsComponent', () => {
    let component: ManageInventoryItemsComponent;
    let fixture: ComponentFixture<ManageInventoryItemsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ManageInventoryItemsComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ManageInventoryItemsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
