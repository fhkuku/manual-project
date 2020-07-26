import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Manual } from '../../../models/manualModel';
import { UserService } from '../../../services/user.service';
import { ManualService } from '../../../services/manual.service';
import { ViewChild } from '@angular/core';
import * as Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
  providers: [UserService, ManualService],
})
export class AgregarComponent implements OnInit {
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
  public url

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _manualService: ManualService
  ) {
    this.page_title = 'Crear nuevo manual';
    this.token = this._userService.getToken();
    this.manual = new Manual('', '', '', 1, 1, '', '', '',1,'');
    this.cargando = false;
    this.btnAgregar = 'Agregar manual';
    this.swal = Swal.default;
    this.url =""
  }
  ngOnInit(): void { }

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
    this._manualService
      .guardarManual(this.token, this.manual, fichero, imagen)
      .subscribe(
        (response) => {
          this.status = response.status;
          this.mensaje = response.mensaje;
          this.cargando = false;
          this.btnAgregar = 'Agregar Manual';
          console.log(this.mensaje);
          if (this.status == 'exito') {
            form.reset();
            this.resetData();
            this._router.navigate(["/"])
          } else if (this.status == 'exist') {
            this.swal
              .fire({
                title: 'Este manual ya existe',
                text: '¿Te gustaría solo actualizar la cantidad del stock?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, actualizar la cantidad',
              })
              .then((result) => {
                if (result.value) {
                  this.manual._id = response.mensaje._id;
                  this._manualService
                    .actualizarManualStock(this.token, this.manual)
                    .subscribe(
                      (response) => {
                        console.log(response);
                        this.status = response.status;
                        if (this.status == 'success') {
                          this.swal.fire(
                            'Actualizado!',
                            'El stock ha sido actualizado',
                            'success'
                          );
                          this._router.navigate(['/']);
                        }
                      },
                      (error) => {
                        console.log(error);
                      }
                    );
                }
              });
          }
        },
        (error) => {
          console.log(error.mensaje);
        }
      );
  }
  resetData() {
    this.manual = new Manual('', '', '', 1, 1, '', '', '',1,'');
    this.imagenManual.nativeElement.value = '';
    this.ficheroManual.nativeElement.value = '';
    this.srcImage = '';
  }
}
