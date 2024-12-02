import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Noticias } from '../models/noticias';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private baseURL = "https://backendvirtualvaultproyect.onrender.com/noticias";


  constructor(private httpClient: HttpClient) { }

  crearNoticias(noticas: any){
    return this.httpClient.post(`${this.baseURL}/crear`, noticas);
  }

  consultarNoticias(id_juego: number): Observable<Noticias[]>{
    return this.httpClient.get<Noticias[]>(`${this.baseURL}/all/${id_juego}`);
  }

  eliminarNoticia(noticia_id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/delete/${noticia_id}`);
  }
}

