import { Component, OnInit,DoCheck } from '@angular/core';
import {global} from "../../services/global.service"
import {Manual} from "../../models/manualModel"
import {CartService} from "../../services/carrito.service"
import {UserService} from "../../services/user.service"
import {Router,ActivatedRoute, Params} from "@angular/router"
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers:[CartService,UserService]
})
export class CarritoComponent implements OnInit, DoCheck {

  public carrito:Array<Manual> =[]
  public total:number
  public url:string
  public productos:Array<Manual> = []
  public token
  public identity
  public cargando
  public btn
  public itemvacio
  constructor(
    private _cartService:CartService,
    private _userService:UserService,
    private _router:Router,
  ) {
    this.url = global.url
    this.cargando = false
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.btn = "Continuar con paypal"
    this.itemvacio = false
   }

  ngOnInit() {
    this.getCarrito()
  }
  ngDoCheck(){
   this.carrito = JSON.parse(localStorage.getItem("carrito"))
  }
  getCarrito(){
    this.productos =JSON.parse(localStorage.getItem("carrito"))
    if(this.productos){
    for(let i =0;i < this.productos.length; i++){
      const producto = new Manual('','','',1,1,'','','',1,'')
      producto._id = this.productos[i]._id
      producto.title = this.productos[i].title
      producto.description = this.productos[i].description
      producto.price = this.productos[i].price
      producto.stock = this.productos[i].stock
      producto.cantidad = this.productos[i].cantidad
      producto.author = this.productos[i].author
      producto.image = this.productos[i].image
      producto.technology = this.productos[i].technology
      producto.comentarios = this.productos[i].comentarios
      this._cartService.changeCart(producto)
    }
    this._cartService.currentDataCart$.subscribe(
      x=>{

        this.carrito = x
        this.total = x.reduce((sum, current) => sum + (current.price * current.cantidad), 0);
      },error=>{
      })
  }
  }
    aumentarCantidad(producto){
      this._cartService.changeCart(producto)
      this._cartService.currentDataCart$.subscribe(
        response=>{

          localStorage.setItem("carrito",JSON.stringify(response))
          this.carrito =JSON.parse(localStorage.getItem("carrito"))
        },error=>{

        }
      )
    }
    reducirCantidad(producto){
      this._cartService.reduceCantidad(producto)
      this._cartService.currentDataCart$.subscribe(
        response=>{
          (response)
          localStorage.setItem("carrito",JSON.stringify(response))
          this.carrito =JSON.parse(localStorage.getItem("carrito"))
        },error=>{

        }
      )
    }
    eliminarCarrito(producto){
      (producto)
      this._cartService.removeElementCart(producto)
      this._cartService.currentDataCart$.subscribe(
        x=>{
          (x)
          localStorage.setItem("carrito",JSON.stringify(x))
          this.carrito =JSON.parse(localStorage.getItem("carrito"))
        },
        error=>{

        }
      )
    }
    pagar(){
      this.cargando = true
      this.btn ="Procesando"
      if(this.carrito){
        if(this.identity){
          this._cartService.pagar(this.token,this.carrito,this.total).subscribe(
            response=>{
              window.location.href = response.mensaje
              this.cargando = false
              this.btn = "Continuar con paypal"
            },
            error=>{
              this.cargando = false
              this.btn = "Continuar con paypal"
            }
          )
        }else{
          localStorage.setItem("registro", "Es necesario registrarte para poder completar la compra")
          this._router.navigate(["/registro"])
          this.cargando = false
          this.btn = "Continuar con paypal"
        }
      }else{
        this.cargando = false
        this.btn = "Continuar con paypal"
        this.itemvacio = true
      }

    }
}
