import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { DesarrolladorService } from '../services/desarrollador.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-initsesion',
  templateUrl: './initsesion.component.html',
  styleUrls: ['./initsesion.component.css']
})
export class InitsesionComponent {
  nombrePag = 'Virtual Vault';
  usuario = 'Usuario';
  contrasenatexto = 'Contraseña';
  ingresar = 'Ingresar';
  Regs = 'Registrarse';
  RC = 'Recuperar Contraseña';
  email: string;
  contrasena: string;

  constructor(private router: Router, private usuarioService: UsuarioService, private desarrolladorService: DesarrolladorService) {}

  consulta(): void {
    this.usuarioService.consultarUsuario(this.email, this.contrasena).subscribe(
      response => {
        console.log('Usuario registrado:', response);
        if (response != null) {
          this.router.navigate(['/tienda']);
        } else {
          this.desarrolladorService.consultarDesarrollador(this.email, this.contrasena).subscribe(
            desarrollador => {
              console.log('Desarrollador registrado:', desarrollador);
              if (desarrollador != null) { // Verifica 'desarrollador'
                this.router.navigate(['/desarrollador']);
              } else {
                console.log("No se encontró ningún usuario o desarrollador con las credenciales");
                this.mostrarModalError();
              }
            },
            error => {
              console.error('Error al consultar desarrollador:', error);
              this.mostrarModalError();
            }
          );
        }
      },
      error => {
        console.error('Error al consultar usuario:', error);
        this.mostrarModalError();
      }
    );
  }

  ngOnInit(): void {
    this.borrarLocalStorage();
  }  
borrarLocalStorage(): void {
    localStorage.clear(); 
  }
  
  mostrarModalError(): void {
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      const myModal = new bootstrap.Modal(modalElement);
      myModal.show();
    }
  }
}
