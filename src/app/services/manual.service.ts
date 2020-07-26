import {Injectable} from "@angular/core"
import {HttpClient,HttpHeaders} from "@angular/common/http"
import {Observable} from "rxjs"
import {global} from "./global.service"
import { Manual } from '../models/manualModel'


@Injectable()
export class ManualService{
  public url:string
  public productos
  public ca:Array<Manual> = []
  public carrito=[{_id:"",title:"",description:"",price:1,stock:1,author:"",image:""}]
  constructor(
    private _http:HttpClient
  ){
    this.url = global.url
    this.productos  = []
  }

  guardarManual(token, manual, fichero:File,imagen:File):Observable<any>{
    let formData:FormData = new FormData()
    let params = JSON.stringify(manual)
    let headers = new HttpHeaders().set("authorization",token)
    formData.append("file",imagen[0])
    formData.append("fichero",fichero[0])
    formData.append("body",params)
    return this._http.post(this.url+"saveManual",formData,{headers:headers})
  }
  actualizarManualStock(token, manual):Observable<any>{
    let params = JSON.stringify(manual)
    let headers = new HttpHeaders().set("Content-Type","application/json").set("authorization",token)
    return this._http.post(this.url+"updateStock",params,{headers:headers})
  }

  getManuales(token):Observable<any>{
    let headers = new HttpHeaders().set("Content-Type","application/json").set("authorization",token)
    return this._http.get(this.url+"getManuales",{headers:headers})
  }
  getManualId(id):Observable<any>{
    let headers = new HttpHeaders().set("Content-Type","application/json")
    return this._http.get(this.url+"getManual/"+id,{headers:headers})
  }

  actualizarManual(token, manual,fichero, imagen):Observable<any>{
    let formData:FormData = new FormData()
    let params = JSON.stringify(manual)
    let headers = new HttpHeaders().set("authorization",token)
    formData.append("file",imagen[0])
    formData.append("fichero",fichero[0])
    formData.append("body",params)
    return this._http.put(this.url+"update",formData,{headers:headers})
  }
  eliminarManual(token, id):Observable<any>{
    let headers = new HttpHeaders().set("Content-Type","application/json").set("authorization",token)
    return this._http.delete(this.url+"delete/"+id,{headers:headers})
  }
  masVendido():Observable<any>{
    let headers = new HttpHeaders().set("Content-Type","application/json")
    return this._http.get(this.url+"top",{headers:headers})
  }

  getProductos():Observable<any>{
    let headers = new HttpHeaders().set("Content-Type","application/json")
    return this._http.get(this.url+"getManuales",{headers:headers})
  }
/*   agregarProductoCarrito(producto){
    if(!this.ca.includes(producto)){
      if(localStorage.getItem("carrito")===null){
        this.ca.push(producto)
      }else{
        this.ca = JSON.parse(localStorage.getItem("carrito"))
        this.ca.push(producto)
        console.log(this.ca);
      }
      if(localStorage.getItem("carrito")===null){
        localStorage.setItem("carrito", JSON.stringify(this.ca))
      }else{
        localStorage.setItem("carrito",JSON.stringify(producto))
        console.log(localStorage.getItem("carrito"))
      }
    }else{
        console.log("Ya existe este producto en tu carrito")
    }
  }

  getCarrito(){
    this.carrito = JSON.parse(localStorage.getItem("carrito"))
    console.log(this.carrito)
    return JSON.stringify(this.carrito)
  }
  updateCantidad(){

  }

  borrarCarrito(producto){
    this.carrito = JSON.parse(localStorage.getItem("carrito"))
    console.log(this.carrito.length)
    for (let i = 0; i < this.carrito.length; i++) {
      console.log(this.carrito[i]._id)
      if (this.carrito[i]._id === producto._id) {
        this.carrito.splice(i--, 1);
        console.log("hola")
      }
    }
    localStorage.setItem("carrito", JSON.stringify(this.carrito))
  }
 */

}
