import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAComponent } from './perfil-a.component';

describe('PerfilAComponent', () => {
  let component: PerfilAComponent;
  let fixture: ComponentFixture<PerfilAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
