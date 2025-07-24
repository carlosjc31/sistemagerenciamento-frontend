import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {


  private url = 'http://localhost:5050';

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

   async getAllUsers(token: string): Promise<any> {
    const url = `${this.url}/adimin/get-all-users`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    try {
      const response = this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;

    }

  }

  async getYourProfile(token: string): Promise<any> {
    const url = `${this.url}/auth/get-perfil`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    try {
      const response = this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

    getUserById(id: string, token: string):Promise<any> {
      const url = `${this.url}/auth/get-user/${id}`;
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
      try {
        const response = this.http.get<any>(url, { headers }).toPromise();
        return response;
      } catch (error) {
        throw error;
      }
  }


  atualizausuario(id: string, userData: any, token: string): Promise<any> {
    const url = `${this.url}/adimin/update/${id}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    try {
      const response = this.http.put<any>(url, userData, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

    asyncdeleteUser(id: string, token: string): Promise<any> {
    const url = `${this.url}/adimin/delete/${id}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    try {
      const response = this.http.delete<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  logOut(): void {
    if(typeof localStorage !== 'undefined'){
      localStorage.removeItem('token');
      localStorage.removeItem('funcao');

    }
  }


  isUser(): boolean {
    if(typeof localStorage !== 'undefined'){
      const funcao = localStorage.getItem('funcao');
      return funcao === 'user';
    }
    return false;
  }

  isAdmin(): boolean {
    if(typeof localStorage !== 'undefined'){
      const funcao = localStorage.getItem('funcao');
      return funcao === 'admin';
    }
    return false;
  }

  isAuthenticated(): boolean {
    if(typeof localStorage !== 'undefined'){
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

}
