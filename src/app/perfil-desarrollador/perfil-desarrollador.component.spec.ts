import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDesarrolladorComponent } from './perfil-desarrollador.component';

describe('PerfilDesarrolladorComponent', () => {
  let component: PerfilDesarrolladorComponent;
  let fixture: ComponentFixture<PerfilDesarrolladorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilDesarrolladorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilDesarrolladorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
