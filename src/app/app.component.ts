import { Component, OnInit, DoCheck } from '@angular/core';
import {UserService} from "./services/user.service"
import {Router,ActivatedRoute, Params} from "@angular/router"
import {global} from "./services/global.service"
import {CartService} from "./services/carrito.service"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService,CartService]
})
export class AppComponent implements OnInit,DoCheck {
  title = 'manual-project';
  public identity
  public token
  public img
  public url
  public carrito
  public cantidadCarrito

  constructor(
    private _userService:UserService,
    private _carritoService:CartService,
    private _router:Router,
  ){
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.carrito = this._carritoService.getCarrito()
    console.log(this.carrito)
    this.url = global.url
  }
  ngOnInit(){
  }
  ngDoCheck(){
    this.identity = this._userService.getIdentity()
    this.carrito = JSON.parse(localStorage.getItem("carrito"))
    if(this.carrito){
      this.cantidadCarrito  = this.carrito.length
    }else{
      this.cantidadCarrito= 0
    }
  }
  logout(){
    localStorage.clear();
    this.identity =null
    this.token =null
    this._router.navigate(['/login'])
  }
  countCarrito(){
  this.cantidadCarrito = this.carrito.length
  }
}
