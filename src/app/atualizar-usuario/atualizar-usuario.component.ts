import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-atualizar-usuario',
  templateUrl: './atualizar-usuario.component.html',
  styleUrl: './atualizar-usuario.component.css'
})
export class AtualizarUsuarioComponent implements OnInit {
  //id: string | null;

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ){}

  errorMessage: any;
  userData: any;

  ngOnInit(): void {
      this.getUserById();
  }

  async getUserById() {
    this.id = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    if(this.id || !token){
      this.showError('ID não encontrado');
      return;
    }
    try {
      let userDataResponse = await this.usuariosService.getUserById(this.id, token);
      const {nome, email, funcao} = userDataResponse.ourUsers;
      this.userData = {nome, email, funcao};

    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async  atualizarusuario() {
    const confir = confirm('Tem certeza que deseja atualizar o usuário?');
    if(!confirm) return
    try {
      const token = localStorage.getItem('token');
      if(!token){
        throw new Error('Token não encontrado')
      }
      const response = await this.usuariosService.atualizausuario(this.id, this.userData, token);
      console.log(response)
    } catch (error: any) {
      this.showError(error.message)
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }

}
