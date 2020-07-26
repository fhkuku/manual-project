import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {global} from "../../services/global.service"
@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent implements OnInit {
  public texto_success
  public detalle
  public result
  public url
  constructor(
    private _activatedRoute: ActivatedRoute
  ) {
    this.result =JSON.parse(this._activatedRoute.snapshot.params.params)[0]
    this.url = global.url
    localStorage.removeItem("carrito")
  }

  ngOnInit(
  ): void {
    this.texto_success ="Gracias por su compra, su orden ha sido recibida"
    this.detalle = "Detalles de la orden"
  }

}
