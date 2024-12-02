import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitsesionComponent } from './initsesion/initsesion.component';
import { TiendaComponent } from './tienda/tienda.component';
import { RecuperarcontrasenaComponent } from './recuperarcontrasena/recuperarcontrasena.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { SoporteComponent } from './soporte/soporte.component';
import { RegistroComponent } from './registro/registro.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { JuegoComponent } from './juego/juego.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { RegistroDesarrolladorComponent } from './registro-desarrollador/registro-desarrollador.component';
import { PerfilDesarrolladorComponent } from './perfil-desarrollador/perfil-desarrollador.component';
import { ModalCrearJuegosComponent } from './modal-crear-juegos/modal-crear-juegos.component';
import { ModalNoticiaComponent } from './modal-noticia/modal-noticia.component';

@NgModule({
  declarations: [
    AppComponent,
    InitsesionComponent,
    TiendaComponent,
    RecuperarcontrasenaComponent,
    NosotrosComponent,
    SoporteComponent,
    RegistroComponent,
    BusquedaComponent,
    JuegoComponent,
    PerfilUsuarioComponent,
    RegistroDesarrolladorComponent,
    PerfilDesarrolladorComponent,
    ModalCrearJuegosComponent,
    ModalNoticiaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
