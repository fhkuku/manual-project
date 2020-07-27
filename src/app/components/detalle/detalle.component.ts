import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Manual } from '../../models/manualModel';
import { UserService } from '../../services/user.service';
import { ManualService } from '../../services/manual.service';
import { ViewChild } from '@angular/core';
import * as Swal from 'sweetalert2';
import { global } from "../../services/global.service"
import { CartService } from "../../services/carrito.service"
import {Comentario} from "../../models/comentarioModel"

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
  providers: [ManualService, UserService, CartService]
})
export class DetalleComponent implements OnInit {
  public srcImage
  public producto
  public url
  public productos: Array<Manual> = []
  public productosArray: Array<Manual> = []
  public carritos: Array<Manual> = []
  public swal;
  public comentario:Comentario
  public identity
  public token
  public status
  public cargando
  public btnText
  public mensaje:string
  public manual:Manual
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _manualService: ManualService,
    private _cartService: CartService
  ) {
    this.url = global.url
    this.identity = _userService.getIdentity()
    this.token = _userService.getToken()
    this.swal =  Swal.default;
    this.comentario =new Comentario('','',this.identity)
    this.cargando=false
    this.btnText ="Publicar comentario"

  }

  ngOnInit(): void {
    this.getManual()
    this.getCarrito()
  }
  getManual() {
    this._route.params.subscribe((params: Params) => {
      let id = params["id"]
      this._manualService.getManualId(id).subscribe(
        response => {
          if (response.status == "vacio") {
            this._router.navigate(['/'])
          } else {

              console.log(this.manual)
              const producto = new Manual('', '', '', 1, 1, '', '', '', 1, '')
              producto._id = response.mensaje._id
              producto.title = response.mensaje.title
              producto.description = response.mensaje.description
              producto.price = response.mensaje.price
              producto.stock = response.mensaje.stock
              producto.cantidad = 1
              producto.author = response.mensaje.author
              producto.image = response.mensaje.image
              producto.technology = response.mensaje.technology
              producto.comentarios = response.mensaje.comentarios
              this.productos.push(producto)
              this.srcImage = this.url + "avatar/" + producto.image
              this.manual = this.productos[0]
          }
        }, error => {
          console.log(error)
        }
      )
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
  getCarrito() {
    this.productosArray = JSON.parse(localStorage.getItem("carrito"))
    if (this.productosArray) {
      for (let i = 0; i < this.productosArray.length; i++) {
        const producto = new Manual('', '', '', 1, 1, '', '', '', 1, '')
        producto._id = this.productosArray[i]._id
        producto.title = this.productosArray[i].title
        producto.description = this.productosArray[i].description
        producto.price = this.productosArray[i].price
        producto.stock = this.productosArray[i].stock
        producto.cantidad = this.productosArray[i].cantidad
        producto.author = this.productosArray[i].author
        producto.image = this.productosArray[i].image
        producto.technology = this.productosArray[i].technology
        this._cartService.changeCart(producto)
      }
      this._cartService.currentDataCart$.subscribe(
        x => {
          localStorage.setItem("carrito", JSON.stringify(x))
        }, error => {
        }

      )
    }
  }
  onSubmit(form){
    this.cargando = true
    this.btnText ="Publicando"
    this._manualService.agregarComentario(this.token, this.comentario, this.productos[0]._id)
          .subscribe(
            response=>{
              this.status = response.status
              this.mensaje = response.mensaje
              this.btnText ="Publicar comentario"
              this.cargando = false
              this.manual = response.model
              console.log(this.manual)
              form.reset()
            },
            error=>{
              this.btnText ="Publicar comentario"
              this.cargando = false
            }
          )

  }
}
