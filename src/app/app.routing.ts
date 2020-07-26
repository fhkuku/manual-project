
import {ModuleWithProviders} from "@angular/core"
import {Routes, RouterModule} from "@angular/router"
import {LoginComponent} from "./components/login/login.component"
import {RegistroComponent} from "./components/registro/registro.component"
import {InicioComponent} from "./components/inicio/inicio.component"
import {CarritoComponent} from "./components/carrito/carrito.component"
import {ConfirmacionComponent} from "./components/confirmacion/confirmacion.component"
import {ProductosComponent} from './components/productos/productos.component'
import {DetalleComponent} from "./components/detalle/detalle.component"
import { Route } from '@angular/compiler/src/core';

const appRoutes:Routes = [
  {path:'', component:InicioComponent},
  {path:'login',component:LoginComponent},
  {path:"registro",component:RegistroComponent},
  {path:"carrito",component:CarritoComponent},
  {path:"confirmacion/:params",component:ConfirmacionComponent},
  {path:"productos",component:ProductosComponent},
  {path:"detalle/:id",component:DetalleComponent},
  {path:"**",component:InicioComponent}
];

export const appRoutingProviders:any[] =[]
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes)
