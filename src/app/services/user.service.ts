import {Injectable} from "@angular/core"
import {HttpClient,HttpHeaders} from "@angular/common/http"
import {Observable, identity} from "rxjs"
import {User} from "../models/userModel"
import {global} from "./global.service"


@Injectable()
export class UserService{
  public url:string
  public identity
  public token
  constructor(private _http:HttpClient){
    this.url = global.url
  }
  prueba(){
    return "Hola esto es una prueba"
  }
  registrar(user, file:File):Observable<any>{
    let formData:FormData = new FormData()
    let params= JSON.stringify(user)
    formData.append("file", file[0])
    formData.append("body",params)
    return this._http.post(this.url+"register", formData)
  }
  iniciarSesion(user,getToken=null):Observable<any>{
    if(getToken!=null){
      user.getToken = getToken
      console.log(user.getToken)
    }
    let params = JSON.stringify(user)
    let headers = new HttpHeaders().set('Content-Type','application/json')

    return this._http.post(this.url+'login',params, {headers:headers})
  }
  getImagen(imagen){
    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this._http.get(this.url+'avatar/'+imagen,{responseType: 'text'})
  }
  getIdentity(){
    let identity= JSON.parse(localStorage.getItem('identity'))
    if(identity && identity!=null && identity != undefined){
      this.identity = identity
    }else{
      this.identity = null
    }

    return this.identity
  }
  getToken(){
    let token = localStorage.getItem("token")
    if(token && token!=null && token != undefined){
      this.token = token
    }else{
      this.token = null
    }
    return this.token
  }


}
