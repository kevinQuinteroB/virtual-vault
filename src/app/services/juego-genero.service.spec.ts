import { TestBed } from '@angular/core/testing';

import { JuegoGeneroService } from './juego-genero.service';

describe('JuegoGeneroService', () => {
  let service: JuegoGeneroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuegoGeneroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
