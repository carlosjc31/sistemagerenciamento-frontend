import { Component } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formData: any = {
    nome: '',
    email: '',
    senha: '',
    funcao: ''
  };
  errorMessage: string = '';

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly router: Router
  ) { }

  async handleSubmit() {

    // Check if all fields are not empty
    if (!this.formData.nome || !this.formData.email || !this.formData.senha || !this.formData.funcao) {
      this.showError('Por favor, preencha todos os campos.');
      return;
    }

    // Confirm registration with user
    const confirmRegistration = confirm('Você tem certeza que deseja se registrar?');
    if (!confirmRegistration) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await this.usuariosService.register(this.formData, token);
      if (response.statusCode === 200) {
        this.router.navigate(['/users']);
      } else {
        this.showError(response.message);
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }
}

