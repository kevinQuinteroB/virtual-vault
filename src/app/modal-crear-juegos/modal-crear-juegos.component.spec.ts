import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearJuegosComponent } from './modal-crear-juegos.component';

describe('ModalCrearJuegosComponent', () => {
  let component: ModalCrearJuegosComponent;
  let fixture: ComponentFixture<ModalCrearJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCrearJuegosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCrearJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
