import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Manual } from '../../../models/manualModel';
import { UserService } from '../../../services/user.service';
import { ManualService } from '../../../services/manual.service';
import { global } from "../../../services/global.service"
import * as Swal from 'sweetalert2';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers: [UserService, ManualService]
})
export class ListarComponent implements OnInit {
  public page_title: string
  public manual
  public token
  public status
  public url
  public swal;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _manualService: ManualService
  ) {
    this.page_title = 'Listado de manuales';
    this.token = this._userService.getToken();
    this.url = global.url
    this.swal = Swal.default;
  }

  ngOnInit(): void {
    this.getManuales()
  }

  getManuales() {
    this._manualService.getManuales(this.token).subscribe(
      response => {
        this.manual = [response][0].mensaje
      },
      error => {
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
              this.getManuales()
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
