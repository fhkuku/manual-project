import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {FormsModule} from "@angular/forms"
import {HttpClientModule, HttpClient} from "@angular/common/http"
import {PanelRoutingModule} from "./app.panel.routing"
//componentes
import { MainComponent } from './components/main/main.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { EditarComponent } from './components/editar/editar.component';
import { ListarComponent } from './components/listar/listar.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { VentasComponent } from './components/ventas/ventas.component';
import {MomentModule} from "angular2-moment";
import { DetalleComponent } from './components/detalle/detalle.component';

@NgModule({
  declarations:[
    MainComponent,
    AgregarComponent,
    EditarComponent,
    ListarComponent,
    BuscarComponent,
    VentasComponent,
    DetalleComponent
  ],
  imports:[
    CommonModule,
    FormsModule,
    HttpClientModule,
    PanelRoutingModule,
    MomentModule
  ],
  exports:[
    MainComponent,
    AgregarComponent,
    EditarComponent,
    ListarComponent
  ],
  providers:[
  ]
})

export class PanelModule{

}
