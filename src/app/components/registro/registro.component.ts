import { Component, OnInit } from '@angular/core';
import {User} from "../../models/userModel"
import {UserService} from "../../services/user.service"
import {Router,ActivatedRoute, Params} from "@angular/router"
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers :[UserService]
})
export class RegistroComponent implements OnInit {
  @ViewChild('file') imagenUsuario: any;
  public user:User;
  public status:string
  public mensaje:string
  public cargando:boolean
  public btnText:string
  public imgSrc:string
  public identity
  public token
  constructor(
    private _userService:UserService,
    private _router:Router,
  ) {
    this.user = new User('','','','','','','ROLE_USER')
    this.cargando = false
    this.btnText = "Registrate"
    this.identity = _userService.getIdentity()
    this.token = _userService.getToken()
  }

  ngOnInit(): void {
    if(this.identity){
      this._router.navigate(["/inicio"])
    }
    if(localStorage.getItem("registro")){
      console.log("si entre perros")
      this.status ="create"
      this.mensaje = localStorage.getItem("registro")
      localStorage.removeItem("registro")
    }
  }

  showImage(file){
    var listAllow = ["png","jpg","jpeg"]
    if(file[0]){
      this.status=''
      const ext  = file[0].type.split("/")
      if(listAllow.includes(ext[1])){
      const reader = new FileReader()
      reader.onload = e => this.imgSrc = reader.result as string;
      reader.readAsDataURL(file[0])
      }
    }
  }
  resetImage(){
    this.imagenUsuario.nativeElement.value = '';
    this.imgSrc = '';
  }
  onSubmit(form,file){
    this.cargando = true;
    this.btnText ="Registrando espere "
    console.log(file)
    this._userService.registrar(this.user, file).subscribe(
      response=>{
        if(response){
          this.status = response.status
          if(this.status =="saveOk"){
            this.mensaje =response.mensaje
            form.reset()
            this.cargando =false
            this.btnText = "Registrate"
            this.imgSrc=""
          }else if(this.status=="extension"){
            this.mensaje =response.mensaje
            this.cargando =false
            this.btnText = "Registrate"
          }else if(this.status=="existe"){
            this.mensaje =response.mensaje
            this.cargando =false
            this.btnText = "Registrate"
          }else if(this.status =="vacio"){
            this.mensaje = response.mensaje
            this.cargando =false
            this.btnText = "Registrate"
          }
        }

      },
      error=>{
        this.status = error.status
        if(error.status =="saveError"){
          this.mensaje =error.mensaje
          this.cargando =false
          this.btnText = "Registrate"
        }else if(error.status =="save500"){
          this.mensaje = error.mensaje
          this.cargando =false
          this.btnText = "Registrate"
        }
      }
    )
  }
}
