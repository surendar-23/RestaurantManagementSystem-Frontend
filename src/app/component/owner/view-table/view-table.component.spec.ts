import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ManageTableComponent} from './view-table.component';

describe('ViewTableComponent', () => {
    let component: ManageTableComponent;
    let fixture: ComponentFixture<ManageTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ManageTableComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ManageTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
