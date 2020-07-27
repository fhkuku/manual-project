import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ManualService } from '../../../services/manual.service';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
  providers:[ManualService]
})
export class DetalleComponent implements OnInit {

  public page_title
  public id
  public detalles
  public fecha
  constructor(
    private _route: ActivatedRoute,
    private _manualService: ManualService
  ) {
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params.id
        this.page_title =  'Detalles de la venta #'+ this.id
        this.getVentaById(this.id)
      }
    )
  }

  getVentaById(id){
    this._manualService.getVentaById(id).subscribe(
      response=>{
        this.detalles = response.mensaje[0]
        this.fecha = this.detalles.fecha
        console.log(this.detalles)
      },
      error=>{
        console.log(error)
      }
    )
  }

}
