import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http"
import {routing, appRoutingProviders} from "./app.routing"
import { AppComponent } from './app.component';
import { CommonModule } from "@angular/common";
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule }   from '@angular/forms';
import {PanelModule} from "../app/panel/app.panel.module";
import { CarritoComponent } from './components/carrito/carrito.component';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { ProductosComponent } from './components/productos/productos.component';
import { DetalleComponent } from './components/detalle/detalle.component';
@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    InicioComponent,
    FooterComponent,
    CarritoComponent,
    ConfirmacionComponent,
    ProductosComponent,
    DetalleComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PanelModule,
    CommonModule,
    routing,
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
