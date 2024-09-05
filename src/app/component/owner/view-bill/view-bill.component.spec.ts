import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ManageBillComponent} from './view-bill.component';

describe('ViewBillComponent', () => {
    let component: ManageBillComponent;
    let fixture: ComponentFixture<ManageBillComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ManageBillComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ManageBillComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
