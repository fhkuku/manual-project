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


@NgModule({
  declarations:[
    MainComponent,
    AgregarComponent,
    EditarComponent,
    ListarComponent
  ],
  imports:[
    CommonModule,
    FormsModule,
    HttpClientModule,
    PanelRoutingModule
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
