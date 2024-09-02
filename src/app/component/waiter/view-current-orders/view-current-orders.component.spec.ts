import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ViewCurrentOrdersComponent} from './view-current-orders.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('ViewCurrentOrdersComponent', () => {
    let component: ViewCurrentOrdersComponent;
    let fixture: ComponentFixture<ViewCurrentOrdersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ViewCurrentOrdersComponent,
                HttpClientTestingModule,
                RouterTestingModule
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ViewCurrentOrdersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
