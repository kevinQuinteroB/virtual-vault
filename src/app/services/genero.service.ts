import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genero } from '../models/genero';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  private baseURL = "https://backendvirtualvaultproyect.onrender.com/generos";


  constructor(private httpClient : HttpClient) { }

  obtenerGeneros():Observable<Genero[]>{
    return this.httpClient.get<Genero[]>(`${this.baseURL}/all`, { withCredentials: true });
  }


  obtenerGenero(id_genero: number):Observable<Genero>{
    return this.httpClient.get<Genero>(`${this.baseURL}/${id_genero}`)
  }

}
