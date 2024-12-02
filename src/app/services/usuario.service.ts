import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseURL = 'https://backendvirtualvaultproyect.onrender.com/user';

  constructor(private httpClient: HttpClient) {}

  registrarUsuario(usuario: any): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/register`, usuario);
  }

  consultarUsuario(email: string, contrasena: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.baseURL}/login/${email}/${contrasena}`)
      .pipe(
        tap(usuario => {
          console.log('Usuario Antes de registrar:', this.getUsuarioRegistrado());
          localStorage.setItem('usuarioRegistrado', JSON.stringify(usuario));
          console.log('Usuario registrado:', this.getUsuarioRegistrado());
        })
      );
  }

  getUsuarioRegistrado(): Usuario {
    return JSON.parse(localStorage.getItem('usuarioRegistrado') || '{}');
  }
}

