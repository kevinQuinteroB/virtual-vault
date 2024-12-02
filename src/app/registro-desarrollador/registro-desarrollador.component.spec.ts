import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDesarrolladorComponent } from './registro-desarrollador.component';

describe('RegistroDesarrolladorComponent', () => {
  let component: RegistroDesarrolladorComponent;
  let fixture: ComponentFixture<RegistroDesarrolladorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroDesarrolladorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroDesarrolladorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
