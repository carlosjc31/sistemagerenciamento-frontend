
import { UsuariosService } from './../usuarios.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
    constructor(private readonly usuariosService: UsuariosService){}

    isAuthenticated:boolean = false;
    isAdmin:boolean = false;
    isUser:boolean = false;


    ngOnInit(): void {
        this.isAuthenticated = this.usuariosService.isAuthenticated();
        this.isAdmin = this.usuariosService.isAdmin();
        this.isUser = this.usuariosService.isUser();
    }

    logout():void{
      this.usuariosService.logOut();
      this.isAuthenticated = false;
      this.isAdmin = false;
      this.isUser = false;
    }

}
