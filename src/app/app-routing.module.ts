import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaComponent } from './tienda/tienda.component';
import { InitsesionComponent } from './initsesion/initsesion.component';
import { RecuperarcontrasenaComponent } from './recuperarcontrasena/recuperarcontrasena.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { SoporteComponent } from './soporte/soporte.component';
import { RegistroComponent } from './registro/registro.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { JuegoComponent } from './juego/juego.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { RegistroDesarrolladorComponent } from './registro-desarrollador/registro-desarrollador.component';
import { PerfilDesarrolladorComponent } from './perfil-desarrollador/perfil-desarrollador.component';

const routes: Routes = [
  { path:'', redirectTo:'/login', pathMatch:'full'},
  { path: 'tienda', component: TiendaComponent },
  { path: 'login', component: InitsesionComponent },
  { path: 'recuperarcontrasena', component: RecuperarcontrasenaComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'soporte', component: SoporteComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'busqueda', component: BusquedaComponent},
  { path: 'game', component: JuegoComponent},
  { path: 'usuario', component: PerfilUsuarioComponent},
  { path: 'registro-desarrollador', component: RegistroDesarrolladorComponent},
  { path: 'desarrollador', component: PerfilDesarrolladorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
