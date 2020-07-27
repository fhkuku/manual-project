import { Component, OnInit } from '@angular/core';
import { ManualService } from '../../../services/manual.service';
import { global } from "../../../services/global.service"
import { Manual } from '../../../models/manualModel';
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  providers:[ManualService]
})
export class VentasComponent implements OnInit {
  public page_title
  public manual
  public url
  public fechaVenta
  constructor(
    private _manualService: ManualService
  ) {
    this.page_title ="Ventas"
  }

  ngOnInit(): void {
    this.getVentas()
  }

  getVentas(){
    this._manualService.getVentas().subscribe(
      x=>{
        this.manual = x.mensaje
      },
      error=>{
        console.log(error)
      }
    )
  }

}
