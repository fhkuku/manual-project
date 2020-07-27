import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute, Params} from "@angular/router"
import { UserService } from '../../services/user.service';
import { User } from '../../models/userModel';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers :[UserService]
})
export class LoginComponent implements OnInit {

  public user:User
  public cargando:boolean
  public btnText:string
  public identity;
  public status:string
  public mensaje:string
  public token;
  constructor(
    private _userService:UserService,
    private _router:Router,
    private _route:ActivatedRoute
  ) {
    this.user = new User('','','','','','','ROLE_USER')
    this.cargando = false
    this.btnText = "Iniciar sesión"
    this.identity = _userService.getIdentity()
    this.token = _userService.getToken()
  }

  ngOnInit(): void {
    console.log(this.identity)
    if(this.identity){
      this._router.navigate(['/inicio'])
    }
  }


  onSubmit(form){
    this.cargando =true
    this.btnText = "Iniciando sesión espere"
    this.status = ""
    this._userService.iniciarSesion(this.user).subscribe(
      response=>{
        this.status = response.status
        if(this.status=="ok"){
          this.identity = response.mensaje

          localStorage.setItem('identity',JSON.stringify(this.identity))

          console.log(this.identity)
          this._userService.iniciarSesion(this.user, true).subscribe(
            response=>{
              console.log(response)
              this.cargando = false
              this.btnText = "Iniciar sesión"
              this.token = response.token
              localStorage.setItem('token',this.token)
              if(this.identity.role=="ROLE_USER"){
                this._router.navigate(['/inicio'])
              }else if(this.identity.role=="ROLE_ADMIN"){
                this._router.navigate(['/panel'])
              }
              form.reset()
            },
            error=>{
              console.log(error)
            }
          )
        }else if(this.status=="incorrect"){
          this.cargando = false
          this.btnText = "Iniciar sesión"
          this.mensaje = response.mensaje
          console.log(response)
        }else if(this.status=="error"){
          this.cargando = false
          this.btnText = "Iniciar sesión"
          this.mensaje = response.mensaje
          console.log(response)
        }
      },
      error=>{
        this.cargando = false
        this.btnText = "Iniciar sesión"
        this.mensaje = error.mensaje
        console.log(error)
      }
    )

  }
}
