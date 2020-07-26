import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Manual } from '../models/manualModel'
import {Paypal} from '../models/paypalModel'
import {HttpClient,HttpHeaders} from "@angular/common/http"
import {global} from "./global.service"
import {Observable} from "rxjs"
@Injectable()
export class CartService {
  private cart = new BehaviorSubject<Array<Manual>>(null); //Definimos nuestro BehaviorSubject, este debe tener un valor inicial siempre
  public currentDataCart$ = this.cart.asObservable(); //Tenemos un observable con el valor actual del BehaviourSubject
  public carrito;
  public paypalJson :Array<Paypal> = []
  public url:string
  constructor(
    private _http:HttpClient
  ) {
    this.url = global.url
  }
  public changeCart(newData: Manual) {
    //Obtenemos el valor actual
    let listCart = this.cart.getValue();
    //Si no es el primer item del carrito
    if (listCart) {
      //Buscamos si ya cargamos ese item en el carrito
      let objIndex = listCart.findIndex((obj => obj._id == newData._id));
      //Si ya cargamos uno aumentamos su cantidad
      if (objIndex != -1) {
        listCart[objIndex].cantidad += 1;
      }
      //Si es el primer item de ese tipo lo agregamos derecho al carrito
      else {
        listCart.push(newData);
      }
    }
    //Si es el primer elemento lo inicializamos
    else {
      listCart = [];
      listCart.push(newData);
    }
    this.cart.next(listCart); //Enviamos el valor a todos los Observers que estan escuchando nuestro Observable
  }
  public reduceCantidad(newData: Manual) {
    //Obtenemos el valor actual
    let listCart = this.cart.getValue();
    //Si no es el primer item del carrito
    if (listCart) {
      //Buscamos si ya cargamos ese item en el carrito
      let objIndex = listCart.findIndex((obj => obj._id == newData._id));
      //Si ya cargamos uno aumentamos su cantidad
      if (objIndex != -1) {
        listCart[objIndex].cantidad -= 1;
      }
      //Si es el primer item de ese tipo lo agregamos derecho al carrito
      else {
        listCart.push(newData);
      }
    }
    //Si es el primer elemento lo inicializamos
    else {
      listCart = [];
      listCart.push(newData);
    }
    this.cart.next(listCart); //Enviamos el valor a todos los Observers que estan escuchando nuestro Observable
  }
  public removeElementCart(newData: Manual) {
    //Obtenemos el valor actual de carrito
    let listCart = this.cart.getValue();
    //Buscamos el item del carrito para eliminar
    let objIndex = listCart.findIndex((obj => obj._id == newData._id));
    if (objIndex != -1) {
      //Seteamos la cantidad en 1 (ya que los array se modifican los valores por referencia, si vovlemos a agregarlo la cantidad no se reiniciará)
      listCart[objIndex].cantidad = 1;
      //Eliminamos el item del array del carrito
      listCart.splice(objIndex, 1);
    }
    this.cart.next(listCart); //Enviamos el valor a todos los Observers que estan escuchando nuestro Observable
  }
  getCarrito(){
    let identity= JSON.parse(localStorage.getItem('carrito'))
    if(identity && identity!=null && identity != undefined){
      this.carrito = identity
    }else{
      this.carrito = null
    }
    return this.carrito
  }
  pagar(token, json:Array<Manual>, total):Observable<any>{
    for(let i = 0; i < json.length; i++){
      const paypal = new Paypal("","",1,"",1)
      paypal.name = json[i].title
      paypal.sku = json[i]._id
      paypal.price = json[i].price
      paypal.currency = "MXN"
      paypal.quantity =json[i].cantidad
      this.paypalJson.push(paypal)
    }
    let headers = new HttpHeaders().set("Content-Type","application/json").set("authorization",token)
    let params = {
      paypalJson:this.paypalJson,
      total:total,
    }
    this.paypalJson = []
    console.log(params)
    return this._http.post(this.url+"pagar",JSON.stringify(params),{headers:headers})
  }
}
