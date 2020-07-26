import { Component, OnInit,DoCheck } from '@angular/core';
import {Router,ActivatedRoute, Params} from "@angular/router"
import { UserService } from '../../services/user.service';
import { ManualService } from '../../services/manual.service';
import { Manual } from '../../models/manualModel';
import { global } from "../../services/global.service"
import {CartService} from "../../services/carrito.service"
import * as Swal from 'sweetalert2';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ManualService,CartService]
})
export class ProductosComponent implements OnInit, DoCheck{
  public url
  public productos:Array<Manual> = []
  public productosArray:Array<Manual> = []
  public carritos:Array<Manual>=[]
  public swal;
  public identity
  constructor(
    private _userService:UserService,
    private _manualService:ManualService,
    private _cartService:CartService,
    private _router:Router,
  ) {
    this.identity = this._userService.getIdentity()
    this.url = global.url
    this.swal = Swal.default;
   }

  ngOnInit(): void {
    if(this.identity && this.identity.role=="ROLE_ADMIN"){
      this._router.navigate(["/panel"])
    }
    this.getProductos()
    this.getCarrito()
  }
  ngDoCheck(){
    this.carritos = JSON.parse(localStorage.getItem("carrito"))
   }

   getProductos(){
    this._manualService.masVendido().subscribe(
      response=>{
        for(let i =0;i < response.mensaje.length; i++){
          const producto = new Manual('','','',1,1,'','','',1,'')
          producto._id = response.mensaje[i]._id
          producto.title = response.mensaje[i].title
          producto.description = response.mensaje[i].description
          producto.price = response.mensaje[i].price
          producto.stock = response.mensaje[i].stock
          producto.cantidad = 1
          producto.author = response.mensaje[i].author
          producto.image = response.mensaje[i].image
          producto.technology = response.mensaje[i].technology
          producto.comentarios = response.mensaje[i].comentarios
          this.productos.push(producto)
        }
      },
      error=>{
        console.log(error)
      }
    )
  }
  aumentarCantidad(producto){
    this._cartService.changeCart(producto)
    this._cartService.currentDataCart$.subscribe(
      response=>{
        localStorage.setItem("carrito",JSON.stringify(response))
        this.carritos =JSON.parse(localStorage.getItem("carrito"))
        this.swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'El producto ha sido agregado al carrito',
          showConfirmButton: false,
          timer: 600
        })
      },error=>{
      }
    )
  }
  getCarrito(){
    this.productosArray =JSON.parse(localStorage.getItem("carrito"))
    if(this.productosArray){
    for(let i =0;i < this.productosArray.length; i++){
      const producto = new Manual('','','',1,1,'','','',1,'')
      producto._id = this.productosArray[i]._id
      producto.title = this.productosArray[i].title
      producto.description = this.productosArray[i].description
      producto.price = this.productosArray[i].price
      producto.stock = this.productosArray[i].stock
      producto.cantidad = this.productosArray[i].cantidad
      producto.author = this.productosArray[i].author
      producto.image = this.productosArray[i].image
      producto.technology = this.productosArray[i].technology
      producto.comentarios = this.productosArray[i].comentarios
      this._cartService.changeCart(producto)
    }
    this._cartService.currentDataCart$.subscribe(
      x=>{
        localStorage.setItem("carrito",JSON.stringify(x))
        this.carritos =JSON.parse(localStorage.getItem("carrito"))
      },error=>{
      }

    )
  }
  }

}
