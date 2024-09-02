import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {UpdateTableDetailsComponent} from './update-table-details.component';
import {WaiterService} from '../../services/waiter.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UpdateTableDetailsComponent', () => {
    let component: UpdateTableDetailsComponent;
    let fixture: ComponentFixture<UpdateTableDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                UpdateTableDetailsComponent,
                ReactiveFormsModule,
                RouterTestingModule,
                HttpClientTestingModule
            ],
            providers: [WaiterService]
        })
            .compileComponents();

        fixture = TestBed.createComponent(UpdateTableDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
