import {Injectable} from "@angular/core"
import {HttpClient,HttpHeaders} from "@angular/common/http"
import {Observable} from "rxjs"
import {global} from "./global.service"


@Injectable()
export class ManualService{
  public url:string
  constructor(
    private _http:HttpClient
  ){
    this.url = global.url
  }

  guardarManual(token, manual, fichero:File,imagen:File):Observable<any>{
    let formData:FormData = new FormData()
    let params = JSON.stringify(manual)
    let headers = new HttpHeaders().set("authorization",token)
    console.log(imagen[0])
    console.log(fichero[0])
    formData.append("file",imagen[0])
    formData.append("fichero",fichero[0])
    formData.append("body",params)
    return this._http.post(this.url+"saveManual",formData,{headers:headers})
  }

}
