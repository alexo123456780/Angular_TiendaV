import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPasswordAComponent } from './editar-password-a.component';

describe('EditarPasswordAComponent', () => {
  let component: EditarPasswordAComponent;
  let fixture: ComponentFixture<EditarPasswordAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPasswordAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPasswordAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
