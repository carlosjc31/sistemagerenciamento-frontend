import { UsuariosService } from './../usuarios.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

    constructor(
    private readonly usuariosService: UsuariosService,
    private router: Router
  ) { }


  email: string = ''
  senha: string = ''
  errorMessage: string = ''

  async handleSubmit() {

    if (!this.email || !this.senha) {
      this.showError("Email e senha são obrigatórios");
      return
    }

    try {
      const response = await this.usuariosService.login(this.email, this.senha);
      if(response.statusCode == 200){
        localStorage.setItem('token', response.token)
        localStorage.setItem('funcao', response.funcao)
        this.router.navigate(['/profile'])
      }else{
        this.showError(response.message)
      }
    } catch (error: any) {
      this.showError(error.message)
    }

  }

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }

}


