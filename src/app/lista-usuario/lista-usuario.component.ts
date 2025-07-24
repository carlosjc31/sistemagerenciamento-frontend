import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrl: './lista-usuario.component.css'
})
export class ListaUsuarioComponent implements OnInit {

  usuarios: any[] = [];
  errorMessage: string = '';

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
      this.loadUsers();
  }

  async loadUsers() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.usuariosService.getAllUsers(token);
      if(response && response.statusCode == 200 && response.listaUsuarios){
        this.usuarios = response.listaUsuarios;
      }else{
        this.showError("Usuário não encontrado");
      }
    } catch (error) {
      this.showError(this.errorMessage);
    }
  }

  async deleteUser(id: string) {
    const confir = confirm('Tem certeza que deseja deletar o usuário?');
    if (!confir) return;
    try {
      const token = localStorage.getItem('token');
      this.usuariosService.deleteUser(id, token);
      this.loadUsers();
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  navigateToUpdate(id: string) {
    this.router.navigate(['/atualizar-usuario', id]);
  }

  showError(errorMessage: string) {
    this.errorMessage = errorMessage;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
