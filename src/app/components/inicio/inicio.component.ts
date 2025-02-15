import { Component, OnInit,DoCheck } from '@angular/core';
import {UserService} from "../../services/user.service"
import {Router,ActivatedRoute, Params} from "@angular/router"
import { ManualService } from '../../services/manual.service';
import { global } from "../../services/global.service"
import { Manual } from '../../models/manualModel';
import {CartService} from "../../services/carrito.service"
import * as Swal from 'sweetalert2';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers:[UserService,ManualService,CartService]
})
export class InicioComponent implements OnInit,DoCheck {

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
  public productos:Array<Manual> = []
  public productosArray:Array<Manual> = []
  public carritos:Array<Manual>=[]
  public swal;
  constructor(
    private _userService:UserService,
    private _manualService:ManualService,
    private _router:Router,
    private _cartService:CartService,
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
    this.url = global.url
    this.swal = Swal.default;
   }

  ngOnInit(): void {
    if(this.identity && this.identity.role=="ROLE_ADMIN"){
      this._router.navigate(["/panel"])
    }
    this.getMasVendido()
    this.getCarrito()
  }
  ngDoCheck(){
    this.carritos = JSON.parse(localStorage.getItem("carrito"))
   }
  getMasVendido(){
    this._manualService.masVendido().subscribe(
      response=>{
        console.log(response)
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
  agregar(manual){
    this._cartService.changeCart(manual)
    this._cartService.currentDataCart$.subscribe(x=>{
      if(x){
        localStorage.setItem("carrito",JSON.stringify(x))
      }
    })
  }
  aumentarCantidad(producto){
    console.log(producto)
    this._cartService.changeCart(producto)
    this._cartService.currentDataCart$.subscribe(
      response=>{
        console.log(response)
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
        console.log(x)
        localStorage.setItem("carrito",JSON.stringify(x))
        this.carritos =JSON.parse(localStorage.getItem("carrito"))
      },error=>{
      }

    )
  }
  }
  abrirModal(){
  }
}
