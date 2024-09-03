import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefHeaderComponent } from './chef-header.component';

describe('ChefHeaderComponent', () => {
  let component: ChefHeaderComponent;
  let fixture: ComponentFixture<ChefHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChefHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChefHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
