import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Comentario } from '../models/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private baseURL = "https://backendvirtualvaultproyect.onrender.com/comentarios";

  constructor(private httpClient: HttpClient) { }

  crearComentarios(comentario: any){
    return this.httpClient.post(`${this.baseURL}/crear`, comentario);
  }

  consultarComentariosJuego(juego_id: number): Observable<Comentario[]>{
    return this.httpClient.get<Comentario[]>(`${this.baseURL}/comentarios/${juego_id}`);
  }
}
