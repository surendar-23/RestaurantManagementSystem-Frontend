import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ViewTableDetailsComponent} from './view-table-details.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('ViewTableDetailsComponent', () => {
    let component: ViewTableDetailsComponent;
    let fixture: ComponentFixture<ViewTableDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ViewTableDetailsComponent,
                HttpClientTestingModule,
                RouterTestingModule
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ViewTableDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
