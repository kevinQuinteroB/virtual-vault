import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Juego } from '../models/juego';


@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  private baseURL = "https://backendvirtualvaultproyect.onrender.com/juegos";
  private querySubject: BehaviorSubject<Juego> = new BehaviorSubject<Juego>({} as Juego);

  constructor(private httpClient : HttpClient) {}
  juego: Juego;

  consultarJuegoCaracter(busqueda: String): Observable<Juego[]>{
    return this.httpClient.get<Juego[]>(`${this.baseURL}/search/${busqueda}`);
  };
  
  crearJuego(juego: any):Observable<any>{
    return this.httpClient.post(`${this.baseURL}/crear`, juego);
  }

  consultarJuegosDesarrollador(id: number): Observable<Juego[]>{
    return this.httpClient.get<Juego[]>(`${this.baseURL}/desarrollador/${id}`);
  }

  consultarJuegoID(id: number):Observable<Juego>{
    return this.httpClient.get<Juego>(`${this.baseURL}/${id}`);
  }

  setQuery(query: Juego): void {
    this.querySubject.next(query);
    console.log(query)
  }

  getQuery(): Observable<Juego> {
    return this.querySubject.asObservable();
    
  }
}
