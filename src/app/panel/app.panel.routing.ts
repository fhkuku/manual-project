import {NgModule} from "@angular/core"
import {RouterModule,Routes, Router} from "@angular/router"
import { MainComponent } from './components/main/main.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { EditarComponent } from './components/editar/editar.component';
import { ListarComponent } from './components/listar/listar.component';
import { BuscarComponent } from "./components/buscar/buscar.component"
import {VentasComponent} from "./components/ventas/ventas.component"
import {DetalleComponent} from "./components/detalle/detalle.component"
const panelRoutes = [
  {
    path:"panel",
    component:MainComponent,
    children:[
      {path:'', component:ListarComponent},
      {path:'agregar', component:AgregarComponent},
      {path:'buscar/:buscar',component:BuscarComponent},
      {path:'ventas',component:VentasComponent},
      {path:'detalle/:id',component:DetalleComponent},
      {path:"editar/:id",component:EditarComponent}
    ]
  }
]

@NgModule({
  imports:[
    RouterModule.forChild(panelRoutes)
  ],
  exports:[
    RouterModule
  ]
})

export class PanelRoutingModule{

}
