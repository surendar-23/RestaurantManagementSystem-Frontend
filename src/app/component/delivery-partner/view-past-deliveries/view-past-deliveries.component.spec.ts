import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewPastDeliveriesComponent} from './view-past-deliveries.component';

describe('ViewPastDeliveriesComponent', () => {
    let component: ViewPastDeliveriesComponent;
    let fixture: ComponentFixture<ViewPastDeliveriesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ViewPastDeliveriesComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ViewPastDeliveriesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
