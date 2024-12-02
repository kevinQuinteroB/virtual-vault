import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventario } from '../models/inventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private baseURL = 'https://backendvirtualvaultproyect.onrender.com/inventario';

  constructor(private httpClient: HttpClient) { }

  consultarInventarioUsuario(usuario_id: number): Observable<Inventario[]> {
    return this.httpClient.get<Inventario[]>(`${this.baseURL}/usuario/${usuario_id}`);
  }
  
  crearCompra(inventario: any){
    return this.httpClient.post(`${this.baseURL}/crear`, inventario);
  }

  juegoObtenido(juegoId: number, usuarioId: number){
    return this.httpClient.get<Inventario>(`${this.baseURL}/inventarios/${juegoId}/${usuarioId}`);
  }

}
