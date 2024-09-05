import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ManageAccountingComponent} from './view-accounting.component';

describe('ViewAccountingComponent', () => {
    let component: ManageAccountingComponent;
    let fixture: ComponentFixture<ManageAccountingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ManageAccountingComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ManageAccountingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
