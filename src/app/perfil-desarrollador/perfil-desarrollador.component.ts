import { Component } from '@angular/core';
import { DesarrolladorService } from '../services/desarrollador.service';
import { PaisService } from '../services/pais.service';
import { Pais } from '../models/pais';
import { JuegoService } from '../services/juego.service';
import { Desarrollador } from '../models/desarrollador';
import { Juego } from '../models/juego';
import { NoticiasService } from '../services/noticias.service';
import { Noticias } from '../models/noticias';
import { Comentario } from '../models/comentario';
import { ComentarioService } from '../services/comentario.service';

@Component({
  selector: 'app-perfil-desarrollador',
  templateUrl: './perfil-desarrollador.component.html',
  styleUrls: ['./perfil-desarrollador.component.css']
})
export class PerfilDesarrolladorComponent {
  isModalJuegoOpen: boolean = false; // Controla la visibilidad del modal
  isModalNoticiaOpen: boolean = false;

  dropdownVisible = false;
  nombrePag = 'Virtual Vault';
  desarrolladorRegistrado: Desarrollador | null = null;

  contrasena: string;
  direccion: string;
  email: string;
  fundacion: string;
  id: number;
  nombre: string;

  pais_id: number;
  pais: Pais;
  NombrePais: string;
  juegos: Juego[];
  noticias: Noticias[];

  juego_id: number;
  noticia_id: number;

  comentarios: Comentario[]

  constructor(private desarrolladorService: DesarrolladorService,
     private paisService: PaisService,
      private juegoService: JuegoService,
      private noticiasService: NoticiasService, 
      private comentarioService: ComentarioService
    ){}

  ngOnInit(): void {
    this.desarrolladorRegistrado = this.desarrolladorService.getDesarrolladorRegistrado();

    if (this.desarrolladorRegistrado) {
      this.contrasena = this.desarrolladorRegistrado.contrasena;
      this.direccion = this.desarrolladorRegistrado.direccion;
      this.email = this.desarrolladorRegistrado.email;
      this.fundacion = this.desarrolladorRegistrado.fundacion;
      this.id = this.desarrolladorRegistrado.id;
      this.nombre = this.desarrolladorRegistrado.nombre;
      this.pais_id = this.desarrolladorRegistrado.pais_id;

      this.paisService.obtenerPais(this.pais_id).subscribe(
        (data: Pais) => {
          this.pais = data;
          this.NombrePais = this.pais.nombre;
        },
        (error) => {
          console.error('Error al obtener el país', error);
        }
      );

      const fecha = new Date(this.fundacion);

      const opciones: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      };

      const NewFecha = new Intl.DateTimeFormat('es-ES', opciones).format(fecha);
      this.fundacion = NewFecha;

      this.juegoService.consultarJuegosDesarrollador(this.id).subscribe(response => {
        this.juegos = response;
        console.log('Lista de Juegos:', this.juegos)
      });
    }
  }

  openCreateGameDialog() {
    this.isModalJuegoOpen = true; // Abre el modal
  }

  openCreateNoticaDialog(juego_id: number){
    this.juego_id = juego_id;
    this.isModalNoticiaOpen = true;
  }

  closeModalJuego(isOpen: boolean) {
    this.isModalJuegoOpen = isOpen; // Cierra el modal
  }

  closeModalNoticia(isOpen: boolean) {
    this.isModalNoticiaOpen = isOpen; // Cierra el modal
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  consultarComentariosJuego(juego_id: number){
    this.juego_id = juego_id;
    this.comentarioService.consultarComentariosJuego(this.juego_id).subscribe(Response => {
      this.comentarios = Response;
      console.log(Response)
    })
  }

  consultarNoticiaJuego(juego_id: number){
    this.juego_id = juego_id;
  
    this.noticiasService.consultarNoticias(this.juego_id).subscribe(response => {
      this.noticias = response.sort((a, b) => {
        const fechaA = new Date(a.fecha_publicacion).getTime();
        const fechaB = new Date(b.fecha_publicacion).getTime();
        return fechaB - fechaA;
      });
      console.log('Lista de Noticias ordenada:', this.noticias);
    });
  }

  eliminarNoticia(noticia_id: number): void {
    console.log("Eliminando noticia con ID:", noticia_id); // Verifica si este log aparece en la consola
    this.noticiasService.eliminarNoticia(noticia_id).subscribe(
      () => {
        // Aquí actualizamos la lista de noticias si se elimina correctamente
        this.noticias = this.noticias.filter(noticia => noticia.id !== noticia_id);
        console.log('Noticia eliminada correctamente');
      },
      (error) => {
        console.error('Error al eliminar la noticia', error);
      }
    );
  }
  

  enviarFormularioJuego(juego: any){
    console.log(juego);
    this.juegoService.crearJuego(juego).subscribe( Response => {
      console.log('Juego Creado Exitosamente', Response);
      this.isModalJuegoOpen = false; // Cierra el modal al crear el juego
      this.juegoService.consultarJuegosDesarrollador(this.id).subscribe(response => {
        this.juegos = response;
        console.log('Lista de Juegos:', this.juegos)
      });
    }, error => {
      console.error('Error al crear el juego', error);
    });
  }
  enviarFormularioNoticia(noticia: any){
    console.log(noticia);
    this.noticiasService.crearNoticias(noticia).subscribe(Response =>{
      console.log('Noticias Creacada con Exito', Response);
      this.isModalNoticiaOpen = false;
      this.consultarNoticiaJuego(this.juego_id);
    })
  }

  
}
