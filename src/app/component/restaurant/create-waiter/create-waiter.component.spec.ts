import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWaiterComponent } from './create-waiter.component';

describe('CreateWaiterComponent', () => {
  let component: CreateWaiterComponent;
  let fixture: ComponentFixture<CreateWaiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateWaiterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWaiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
