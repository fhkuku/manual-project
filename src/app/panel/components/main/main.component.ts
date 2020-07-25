import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute, Params} from "@angular/router"
import { UserService } from '../../../services/user.service';
import {global} from "../../../services/global.service"

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public identity
  public token
  public url
  constructor(
    private _userService:UserService,
    private _router:Router,
  ){
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken()
    this.url = global.url
  }

  ngOnInit(): void {
    if(!this.identity){
      this._router.navigate(["/login"])
    }
    if(this.identity && this.identity.role=="ROLE_USER"){
      this._router.navigate(["/inicio"])
    }
  }

  logout(){
    localStorage.clear()
    this.identity =null
    this.token = null
    this._router.navigate(["/login"])
  }

}
