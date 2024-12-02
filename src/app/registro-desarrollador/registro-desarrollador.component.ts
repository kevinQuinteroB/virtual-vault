import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pais } from '../models/pais';
import { PaisService } from '../services/pais.service';
import { DesarrolladorService } from '../services/desarrollador.service';

@Component({
  selector: 'app-registro-desarrollador',
  templateUrl: './registro-desarrollador.component.html',
  styleUrl: './registro-desarrollador.component.css'
})
export class RegistroDesarrolladorComponent implements OnInit {


  constructor(private router: Router, private paisServicio: PaisService, private desarrolladoServicio: DesarrolladorService) {
    this.email = '';
    this.contrasena = '';
    this.nombre = '';
    this.direccion = '';
    this.fundacion = '';
    this.pais_id = 0;

    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }

  email: string;
  contrasena: string;
  nombre: string;
  direccion: string;
  fundacion: string;
  pais_id: number;
  maxDate: string;

  checkbox: boolean;
  paises: Pais[];

  mensaje: string;
  titulomensaje: string

  ngOnInit(): void {
    this.obtenerPaises();
  }

  obtenerPaises(): void {
    this.paisServicio.obtenerPaises().subscribe(paises => {
      this.paises = paises;
    });
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  terminosAceptados(): boolean {
    const checkbox = document.getElementById('flexCheckDefault') as HTMLInputElement;
    return checkbox ? checkbox.checked : false;
  }

  camposLlenos(): boolean {
    return (
      this.email !== '' &&
      this.contrasena !== '' &&
      this.nombre !== '' &&
      this.direccion !== '' &&
      this.fundacion !== '' &&
      this.pais_id >= 1

    );
  }

  formularioCompleto(): boolean {
    const camposLlenos = this.camposLlenos();
    const terminosAceptados = this.terminosAceptados();
    return terminosAceptados && camposLlenos;
  }

  registrar(): void {
    const desarrollador = {
      email: this.email,
      contrasena: this.contrasena,
      nombre: this.nombre,
      direccion: this.direccion,
      fundacion: this.fundacion,
      pais_id: Number(this.pais_id)
    }

    this.desarrolladoServicio.registrarDesarrollador(desarrollador).subscribe(Response =>{
      console.log(desarrollador);
      console.log('desarrollador registrado:', Response);
      this.titulomensaje = "Registro exitoso"
      this.mensaje = "¡Gracias por registrarte en nuestra página web! Nos alegra que te unas a nuestra comunidad. Estamos aquí para ofrecerte la mejor experiencia y cualquier ayuda que necesites. ¡Bienvenido/a!"
      
    },error => {
      console.log(desarrollador);
      console.error('Error al registrar desarrollador:', error);
      this.titulomensaje = "Registro denegado"
      this.mensaje = "Parece que ingresaste un usuario o desarrollador con un email ya existente"
    }
      
    );
  }
}
