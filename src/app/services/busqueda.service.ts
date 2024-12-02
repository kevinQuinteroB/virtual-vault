import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  private querySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  setQuery(query: string): void {
    this.querySubject.next(query);
    console.log(query)
  }

  getQuery(): Observable<string> {
    return this.querySubject.asObservable();
    
  }
}
