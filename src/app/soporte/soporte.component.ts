import { Component } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.component.html',
  styleUrl: './soporte.component.css'
})
export class SoporteComponent {
  nombrePag = 'Virtual Vault'
  noticias = 'Noticias'
  tienda = 'Tienda'
  soporte = 'Soporte'
  acerca = 'Nosotros'
  USUARIO = 'USUARIO'
  usuarioRegistrado: Usuario | null = null;
  
  constructor(private usuarioService: UsuarioService) {}
  
  ngOnInit(): void {
    this.usuarioRegistrado = this.usuarioService.getUsuarioRegistrado();
    console.log(this.usuarioRegistrado);
    if (this.usuarioRegistrado) {
      this.USUARIO = this.usuarioRegistrado.username;
      console.log(this.usuarioRegistrado.username);
    }
  }
  
  dropdownVisible = false;

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
}
