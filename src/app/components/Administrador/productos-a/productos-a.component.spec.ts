import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosAComponent } from './productos-a.component';

describe('ProductosAComponent', () => {
  let component: ProductosAComponent;
  let fixture: ComponentFixture<ProductosAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
