import { Component, OnInit, DoCheck } from '@angular/core';
import {UserService} from "./services/user.service"
import {Router,ActivatedRoute, Params} from "@angular/router"
import {global} from "./services/global.service"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent implements OnInit,DoCheck {
  title = 'manual-project';
  public identity
  public token
  public img
  public url
  constructor(
    private _userService:UserService,
    private _router:Router,
  ){
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.url = global.url
  }

  ngOnInit(){
  }
  ngDoCheck(){
    this.identity = this._userService.getIdentity()
  }
  logout(){
    localStorage.clear();
    this.identity =null
    this.token =null
    this._router.navigate(['/login'])
  }

}
