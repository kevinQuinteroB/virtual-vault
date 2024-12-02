import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import { JuegoService } from '../services/juego.service';
import { BusquedaService } from '../services/busqueda.service';
import { GeneroService } from '../services/genero.service';
import { Genero } from '../models/genero';
import { JuegoGeneroService } from '../services/juego-genero.service';
import { JuegoGenero } from '../models/juego-genero';
import { forkJoin } from 'rxjs';
import { DesarrolladorService } from '../services/desarrollador.service';
import { InventarioService } from '../services/inventario.service';
import { Inventario } from '../models/inventario';
import { ComentarioService } from '../services/comentario.service';
import { Comentario } from '../models/comentario';
import { NoticiasService } from '../services/noticias.service';
import { Noticias } from '../models/noticias';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css'
})
export class JuegoComponent {
  nombrePag = 'Virtual Vault'
  noticias = 'Noticias'
  tienda = 'Tienda'
  soporte = 'Soporte'
  acerca = 'Nosotros'

  USUARIO = 'USUARIO'
  usuarioRegistrado: Usuario | null = null;
  Inventario: Inventario;
  noticiasLista: Noticias[];

  constructor(private juegosGeneroService: JuegoGeneroService,
    private generoService: GeneroService,
    private usuarioService: UsuarioService,
    private jugoService: JuegoService,
    private desarrolladorService: DesarrolladorService,
    private noticiasService: NoticiasService,
    private inventarioService: InventarioService,
    private comentarioService: ComentarioService) {

  }

  id: number
  nombre: string
  fecha_lanzamiento: Date
  portada: string
  valoracion: number
  desarrollador_id: number
  descuento: number
  precio: number
  descripcion: string
  preciofinal: number
  juegosGenero: JuegoGenero[] = [];
  generos: Genero[] = [];
  link: string;
  descripcionComentario: string;

  juegoObtenido = "Ir al sitio web";
  juegoComprado: boolean;
  compra: Inventario = new Inventario;
  comentarioInt: number;
  

  NombreDesarrollador: string;
  comentario: Comentario;
  comentarios: Comentario[];

  comentarioLongitud: number = 0;
  ngOnInit() {
    
    this.usuarioRegistrado = this.usuarioService.getUsuarioRegistrado();
    this.comentarioInt = Object.keys(this.usuarioRegistrado).length
    this.USUARIO = this.usuarioRegistrado.username
    this.jugoService.getQuery().subscribe(query => {
      this.id = query.id;
      this.nombre = query.nombre;
      this.fecha_lanzamiento = query.fecha_lanzamiento;
      this.portada = query.portada;
      this.desarrollador_id = query.desarrollador;
      this.descripcion = query.descripcion;
      this.link = query.link;
      console.log(query)
    });

    this.juegosGeneroService.consultarGeneroJuego(this.id).subscribe(response => {

      this.juegosGenero = response;

      let observables = this.juegosGenero.map(juegoGenero => this.generoService.obtenerGenero(juegoGenero.id_Genero));

      forkJoin(observables).subscribe(results => {
        this.generos = results as Genero[];
        console.log(this.generos)
      });
    });

    this.desarrolladorService.consultarIdDesarrollador(this.desarrollador_id).subscribe(Response => {
      this.NombreDesarrollador = Response.nombre;
    })

    this.inventarioService.juegoObtenido(this.id, this.usuarioRegistrado.id).subscribe(Response => {
      if (Response && Object.keys(Response).length !== 0) {
        this.juegoComprado = true;
        this.juegoObtenido = "Ir al sitio web"
      } else {
        this.juegoComprado = false;
        this.juegoObtenido = "Obtener"
      }
    })

    this.comentarioService.consultarComentariosJuego(this.id).subscribe(Response => {
      this.comentarios = Response;
      console.log(Response)
    })

    this.noticiasService.consultarNoticias(this.id).subscribe(response => {
      this.noticiasLista = response.sort((a, b) => {
        const fechaA = new Date(a.fecha_publicacion).getTime();
        const fechaB = new Date(b.fecha_publicacion).getTime();
        return fechaB - fechaA;
      });
      console.log('Lista de Noticias ordenada:', this.noticias);
    });
  }

  isHovered = false;
  dropdownVisible = false;

  toggleHover() {
    this.isHovered = !this.isHovered;
  }

  actualizarLongitudComentario() {
    this.comentarioLongitud = this.descripcionComentario.length; // Actualiza la longitud de los caracteres
  }

  toggleDropdown() {
    if (this.usuarioRegistrado && Object.keys(this.usuarioRegistrado).length > 0) {
      console.log(this.usuarioRegistrado)
      this.dropdownVisible = !this.dropdownVisible;
    }
  }


  crearCometario() {
    console.log("Crear Comentario")
    this.comentario = new Comentario();
    this.comentario.juego_id = this.id
    if(this.usuarioRegistrado){
      this.comentario.usuario_id = this.usuarioRegistrado?.id
    }
    this.comentario.descripcion = this.descripcionComentario;
    console.log(this.comentario)
    this.comentarioService.crearComentarios(this.comentario).subscribe(
      (response) => {
        console.log("Comentario enviado con éxito:", response);
        this.comentarioService.consultarComentariosJuego(this.id).subscribe(Response => {
          this.comentarios = Response;
          this.comentario.juego_id
          console.log(Response)
        })
        // Limpiar el textarea después de enviar el comentario
        this.descripcionComentario = "";  // Limpiar el textarea
        alert("Mensaje enviado con exito")
      },
      (error) => {
        console.log("Error al enviar comentario:", error);
      }
    )
  }

  irAlLink() {
    if (this.juegoComprado) {
      window.open(this.link, '_blank');
    } else if (this.usuarioRegistrado && Object.keys(this.usuarioRegistrado).length > 0) {
      console.log("Juego no esta comprado")
      this.compra.juego_id = this.id;
      this.compra.usuario_id = this.usuarioRegistrado?.id;
      console.log(this.compra);
      this.inventarioService.crearCompra(this.compra).subscribe()
      this.juegoComprado = true;
      this.juegoObtenido = "Ir al sitio web"
    } else {
      window.open(this.link, '_blank');
    }
  }
}
