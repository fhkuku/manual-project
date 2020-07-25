import {NgModule} from "@angular/core"
import {RouterModule,Routes, Router} from "@angular/router"
import { MainComponent } from './components/main/main.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { EditarComponent } from './components/editar/editar.component';
import { ListarComponent } from './components/listar/listar.component';

const panelRoutes = [
  {
    path:"panel",
    component:MainComponent,
    children:[
      {path:'', component:ListarComponent},
      {path:'agregar', component:AgregarComponent},
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
