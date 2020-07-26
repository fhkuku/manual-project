import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Manual } from '../../models/manualModel';
import { UserService } from '../../services/user.service';
import { ManualService } from '../../services/manual.service';
import { ViewChild } from '@angular/core';
import * as Swal from 'sweetalert2';
import {global} from "../../services/global.service"
import {CartService} from "../../services/carrito.service"
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  public srcImage
  public producto
  public url
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _manualService: ManualService
  ) {
    this.url = global.url
   }

  ngOnInit(): void {

  }
  getManual(){
    this._route.params.subscribe((params:Params)=>{
      let id =params["id"]
      this._manualService.getManualId(id).subscribe(
        response=>{
          if(response.status=="vacio"){
            this._router.navigate(['/'])
          }else{
            this.producto = response.mensaje
            this.srcImage = this.url+"avatar/"+this.producto.image

            console.log
          }
        },error=>{
          console.log(error)
        }
      )
    })
  }
}
