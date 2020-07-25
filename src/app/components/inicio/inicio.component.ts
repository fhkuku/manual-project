import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service"
import {Router,ActivatedRoute, Params} from "@angular/router"

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public inicio_titulo:string
  public inicio_subtitulo:string
  public inicio_descripcion:string
  public inicio_btnComprar:string
  public inicio_tituloBanner:string
  public inicio_manualPopular:string
  public inicio_productos:string
  public inicio_vendidos:string
  public identity
  public token
  public url
  constructor(
    private _userService:UserService,
    private _router:Router,

  ) {
    this.inicio_titulo = "Helps Books"
    this.inicio_subtitulo ="Aprender es divertido"
    this.inicio_descripcion ="Helps books, las mejores guías para aprender, practicar y manejar"
    this.inicio_btnComprar ="Manuales populares"
    this.inicio_productos ="Productos más"
    this.inicio_vendidos ="vendidos"
    this.inicio_btnComprar ="Comprar ahora"
    this.inicio_tituloBanner="Las mejores guías y manuales al mejor precio."
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()

   }

  ngOnInit(): void {
    if(this.identity && this.identity.role=="ROLE_ADMIN"){
      this._router.navigate(["/panel"])
    }
  }

}
