import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})

export class PerfilComponent implements OnInit {

  constructor(private readonly usuariosService: UsuariosService,
    private readonly router: Router){}


    profileInfo: any;
    errorMessage: string = ''

  async ngOnInit() {
    try {
      const token = localStorage.getItem('token')
      if(!token){
        throw new Error("Nenhum Token Encontrado")
      }

      this.profileInfo = await this.usuariosService.getYourProfile(token);
    } catch (error:any) {
      this.showError(error.message)
    }

  }


  updateProfile(id: string){
      this.router.navigate(['/update', id])
  }


  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }
}
