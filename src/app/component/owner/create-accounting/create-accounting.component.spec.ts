import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountingComponent } from './create-accounting.component';

describe('CreateAccountingComponent', () => {
  let component: CreateAccountingComponent;
  let fixture: ComponentFixture<CreateAccountingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAccountingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
