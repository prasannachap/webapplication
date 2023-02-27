import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionProductsComponent } from './description-products.component';

describe('DescriptionProductsComponent', () => {
  let component: DescriptionProductsComponent;
  let fixture: ComponentFixture<DescriptionProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
