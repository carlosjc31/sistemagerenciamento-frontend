import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = 'http://localhost:5050/usuarios';

  constructor(private http: HttpClient) { }

  async login(email: String, senha: String): Promise<any> {

    const url = `${this.url}/auth/login`;
    try {
      const response = await this.http.post<any>(url, {email, senha}).toPromise();
      return response;

    } catch (error) {
        throw error;
    }

  }

   async register(userData: any, token: String): Promise<any> {

    const headers = {
      Authorization: `Bearer ${token}`
    };
    const url = `${this.url}/auth/register`;
    try {
      const response = await this.http.post<any>(url, userData, {headers}).toPromise();
      return response;

    } catch (error) {
        throw error;
    }

  }

}
