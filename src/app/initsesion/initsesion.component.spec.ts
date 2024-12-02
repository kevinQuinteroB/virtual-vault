import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitsesionComponent } from './initsesion.component';

describe('InitsesionComponent', () => {
  let component: InitsesionComponent;
  let fixture: ComponentFixture<InitsesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitsesionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitsesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
