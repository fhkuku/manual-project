import { Component, OnInit } from '@angular/core';
import { Manual } from '../../../models/manualModel';
import { UserService } from '../../../services/user.service';
import { ManualService } from '../../../services/manual.service';
import { global } from "../../../services/global.service"
import * as Swal from 'sweetalert2';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-buscar',
  templateUrl: '../listar/listar.component.html',
  styleUrls: ['./buscar.component.css'],
  providers:[ManualService]
})
export class BuscarComponent implements OnInit {
  public manual:Manual[]
  public page_title: string
  public identity
  public token
  public status
  public url
  public swal;
  public buscar
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _manualService: ManualService
  ) {
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken()
    this.url = global.url
    this.token = this._userService.getToken()
    this.page_title ="Resultados de la busqueda "
    this.swal = Swal.default;
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.buscar = params.buscar
        this.page_title =  'Resultados de la busqueda de '+ this.buscar
        this.getManuales(this.buscar,this.token)
      }
    )
  }

  getManuales(buscar,token){
    this._manualService.buscar(buscar,token).subscribe(
      response=>{
        if(response.mensaje){
          this.manual = response.mensaje
          console.log(this.manual)
        }
      },
      error=>{
        console.log(error)
      }
    )
  }
  delete(id) {
    this.swal.fire({
      title: '¿Deseas eliminar este manual?',
      text: "Esta acción no se podrá deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.value) {
        this._manualService.eliminarManual(this.token, id).subscribe(
          response => {
            this.status = response.status
            if (this.status == "exito") {
              this.swal.fire(
                'Eliminado',
                'El manual ha sido eliminado',
                'success'
              )
              this.getManuales(this.buscar,this.token)
            }else if(this.status =="error"){
              this.swal.fire(
                'Error',
                'No se pudo actualizar el manual',
                'error'
              )
            }
          },
          error => {

          }
        )
      }
    })

  }
}
