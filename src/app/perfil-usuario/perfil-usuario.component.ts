import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import { PaisService } from '../services/pais.service';
import { Pais } from '../models/pais';
import { InventarioService } from '../services/inventario.service';
import { Inventario } from '../models/inventario';
import { Juego } from '../models/juego';
import { JuegoService } from '../services/juego.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent {
  nombrePag = 'Virtual Vault'
  noticias = 'Noticias'
  tienda = 'Tienda'
  soporte = 'Soporte'
  acerca = 'Nosotros'
  USUARIO = 'USUARIO'
  username: string;
  telefono: number;
  pais_id: number;
  primerApellido: string;
  primerNombre: string;
  correo: string;
  usuarioRegistrado: Usuario | null = null;

  pais: Pais;
  NombrePais: string;

  juegosIds: Inventario[] = [];
  juegosNombres: Juego[] = [];

  dropdownVisible = false;

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  constructor(private usuarioService: UsuarioService,
     private paisService: PaisService, 
     private inventarioService: InventarioService,
     private juegoService: JuegoService, 
     private router:Router ) {

  }

  ngOnInit(): void {
    this.usuarioRegistrado = this.usuarioService.getUsuarioRegistrado();
    console.log(this.usuarioRegistrado);
    if (this.usuarioRegistrado) {
      this.USUARIO = this.usuarioRegistrado.username;
      this.username = this.usuarioRegistrado.username;
      this.primerNombre = this.usuarioRegistrado.primerNombre;
      this.primerApellido = this.usuarioRegistrado.primerApellido;
      this.pais_id = this.usuarioRegistrado.pais_id;
      this.telefono = this.usuarioRegistrado.telefono;
      this.correo = this.usuarioRegistrado.email

      this.paisService.obtenerPais(this.pais_id).subscribe(
        (data: Pais) => {
          this.pais = data;
          this.NombrePais = this.pais.nombre;
        },
        (error) => {
          console.error('Error al obtener el país', error);
        }
      );
      
      this.inventarioService.consultarInventarioUsuario(this.usuarioRegistrado.id).subscribe( response => {
        this.juegosIds = response;
        console.log('Lista de Juegos:', this.juegosIds);

        const juegosNombres$ = this.juegosIds.map((inventario: Inventario) => 
          this.juegoService.consultarJuegoID(inventario.juego_id)
        );

        forkJoin(juegosNombres$).subscribe(juegos => {
          // 'juegos' es el array con los objetos Juego obtenidos
          console.log('Juegos obtenidos:', juegos);

          // Extraemos solo los nombres de los juegos
          this.juegosNombres = juegos.map(juego => juego);
          console.log('Nombres de Juegos:', this.juegosNombres);
        }, error => {
          console.error('Error al obtener los nombres de los juegos', error);
        });
      })
    }
  }

  toRedirect(juego: Juego){
    this.router.navigate(['/game']);
    console.log("redireccion", juego);
    this.juegoService.setQuery(juego);
  }
}
