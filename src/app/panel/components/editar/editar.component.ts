import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Manual } from '../../../models/manualModel';
import { UserService } from '../../../services/user.service';
import { ManualService } from '../../../services/manual.service';
import { ViewChild } from '@angular/core';
import * as Swal from 'sweetalert2';
import {global} from "../../../services/global.service"

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  providers: [UserService, ManualService],
})
export class EditarComponent implements OnInit {
  @ViewChild('imagen') imagenManual: any;
  @ViewChild('fichero') ficheroManual: any;
  public page_title: string;
  public manual: Manual;
  public token;
  public srcImage: string;
  public status: string;
  public cargando: boolean;
  public btnAgregar: string;
  public mensaje: string;
  public swal;
  public url:string

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _manualService: ManualService
  ) {
    this.page_title = 'Modificar manual';
    this.token = this._userService.getToken();
    this.manual = new Manual('', '', '', 1, 1, '','', '',1,'');
    this.cargando = false;
    this.btnAgregar = 'Modificar manual';
    this.swal = Swal.default;
    this.url = global.url

  }


  ngOnInit(): void {
    this.getManual()
  }

  showImage(file) {
    var listAllow = ['png', 'jpg', 'jpeg'];
    if (file[0]) {
      this.status = '';
      const ext = file[0].type.split('/');
      if (listAllow.includes(ext[1])) {
        const reader = new FileReader();
        reader.onload = (e) => (this.srcImage = reader.result as string);
        reader.readAsDataURL(file[0]);
      }else{
        this.srcImage =''
      }
    }
  }
  onSubmit(form, fichero, imagen) {
    this.cargando = true;
    this.btnAgregar = 'Procesando espere..';
    this._manualService.actualizarManual(this.token,this.manual,fichero,imagen).subscribe(
      response=>{
        this.cargando = false
        this.btnAgregar = 'Modificar manual';
        this.swal.fire(
          'Actualizado!',
          'El manual ha sido actualizado',
          'success'
        );
        this._router.navigate(['/']);
      },
      error=>{
        console.log(error);
        this.cargando = false
        this.btnAgregar = 'Modificar manual';
      }
    )
  }
  resetData() {
    this.manual = new Manual('', '', '', 1, 1, '', '','',1,'');
    this.imagenManual.nativeElement.value = '';
    this.ficheroManual.nativeElement.value = '';
    this.srcImage = '';
  }

  getManual(){
    this._route.params.subscribe((params:Params)=>{
      let id =params["id"]
      this._manualService.getManualId(id).subscribe(
        response=>{
          if(response.status=="vacio"){
            this._router.navigate(['/'])
          }else{
            this.manual = response.mensaje
            this.srcImage = this.url+"avatar/"+this.manual.image
          }
        },error=>{
          console.log(error)
        }
      )
    })
  }
}
