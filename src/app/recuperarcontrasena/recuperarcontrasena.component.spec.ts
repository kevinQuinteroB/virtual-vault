import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarcontrasenaComponent } from './recuperarcontrasena.component';

describe('RecuperarcontrasenaComponent', () => {
  let component: RecuperarcontrasenaComponent;
  let fixture: ComponentFixture<RecuperarcontrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecuperarcontrasenaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecuperarcontrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
