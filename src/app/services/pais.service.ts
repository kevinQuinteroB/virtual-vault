import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../models/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  //Saca los empleados del backend
  private baseURL = "https://backendvirtualvaultproyect.onrender.com/paises";

  constructor(private httpClient : HttpClient) { }

  //Obtener los empleados
  obtenerPaises():Observable<Pais[]>{
    return this.httpClient.get<Pais[]>(`${this.baseURL}/all`);
  }

  obtenerPais(id_pais: number):Observable<Pais>{
    return this.httpClient.get<Pais>(`${this.baseURL}/${id_pais}`)
  }
}
