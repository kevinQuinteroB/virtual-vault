import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';
import { BusquedaService } from '../services/busqueda.service';
import { GeneroService } from '../services/genero.service';
import { Genero } from '../models/genero';
import { Juego } from '../models/juego';
import { JuegoService } from '../services/juego.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent {
  nombrePag = 'Virtual Vault'
  noticias = 'Noticias'
  tienda = 'Tienda'
  soporte = 'Soporte'
  acerca = 'Nosotros'
  destacado = 'Destacado'
  ofertas = 'Otros destacados'
  eventos = 'Eventos'
  free = "Dales una oportunidad"
  USUARIO = 'USUARIO'
  usuarioRegistrado: Usuario | null = null;
  textoBusqueda: string = '';
  genero_id: number;
  generos: Genero[];

  juego: Juego;

  isHovered = false;

  toggleHover() {
    this.isHovered = !this.isHovered;
  }

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private busquedaService: BusquedaService,
    private generoService: GeneroService,
    private juegoService: JuegoService,) {
    this.genero_id;
  }

  dropdownVisible = false;

  consultar() {
    this.router.navigate(['/busqueda']);
    this.busquedaService.setQuery(this.textoBusqueda);
  }
  redirectrocket(){
    this.juegoService.consultarJuegoID(662).subscribe(Response => {
      this.juego = Response;
      console.log(this.juego)

      this.router.navigate(['/game']);
      console.log("redireccion", this.juego);
      this.juegoService.setQuery(this.juego);
    })
  }
  redirectfornite(){
    this.juegoService.consultarJuegoID(661).subscribe(Response => {
      this.juego = Response;
      console.log(this.juego)

      this.router.navigate(['/game']);
      console.log("redireccion", this.juego);
      this.juegoService.setQuery(this.juego);
    })
  }
  redirectpubg(){
    this.juegoService.consultarJuegoID(660).subscribe(Response => {
      this.juego = Response;
      console.log(this.juego)

      this.router.navigate(['/game']);
      console.log("redireccion", this.juego);
      this.juegoService.setQuery(this.juego);
    })
  }
  redirectcs(){
    this.juegoService.consultarJuegoID(659).subscribe(Response => {
      this.juego = Response;
      console.log(this.juego)

      this.router.navigate(['/game']);
      console.log("redireccion", this.juego);
      this.juegoService.setQuery(this.juego);
    })
  }
  redirectdota(){
    this.juegoService.consultarJuegoID(656).subscribe(Response => {
      this.juego = Response;
      console.log(this.juego)

      this.router.navigate(['/game']);
      console.log("redireccion", this.juego);
      this.juegoService.setQuery(this.juego);
    })
  }
  redirectover() {
    this.juegoService.consultarJuegoID(655).subscribe(Response => {
      this.juego = Response;
      console.log(this.juego)

      this.router.navigate(['/game']);
      console.log("redireccion", this.juego);
      this.juegoService.setQuery(this.juego);
    })
  }
  redirectapex() {
    this.juegoService.consultarJuegoID(654).subscribe(Response => {
      this.juego = Response;
      console.log(this.juego)

      this.router.navigate(['/game']);
      console.log("redireccion", this.juego);
      this.juegoService.setQuery(this.juego);
    })
  }

  redirectlol() {
    this.juegoService.consultarJuegoID(653).subscribe(Response => {
      this.juego = Response;
      console.log(this.juego)

      this.router.navigate(['/game']);
      console.log("redireccion", this.juego);
      this.juegoService.setQuery(this.juego);
    })
  }
  

  redirectWarzone() {
    this.juegoService.consultarJuegoID(602).subscribe(Response => {
      this.juego = Response;
      console.log(this.juego)

      this.router.navigate(['/game']);
      console.log("redireccion", this.juego);
      this.juegoService.setQuery(this.juego);
    })
  }

  redirectValorant() {
    this.juegoService.consultarJuegoID(652).subscribe(Response => {
      this.juego = Response;
      console.log(this.juego)

      this.router.navigate(['/game']);
      console.log("redireccion", this.juego);
      this.juegoService.setQuery(this.juego);
    })


  }

  ngOnInit(): void {

    this.generoService.obtenerGeneros().subscribe(generos => {
      this.generos = generos;
    })
    this.usuarioRegistrado = this.usuarioService.getUsuarioRegistrado();
    console.log(this.usuarioRegistrado);
    if (this.usuarioRegistrado) {
      this.USUARIO = this.usuarioRegistrado.username;
      console.log(this.usuarioRegistrado.username);
    }
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
}
