import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNoticiaComponent } from './modal-noticia.component';

describe('ModalNoticiaComponent', () => {
  let component: ModalNoticiaComponent;
  let fixture: ComponentFixture<ModalNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalNoticiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
