import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    
   }


  logar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>('https://mybloggpersonal.herokuapp.com/usuario/logar', usuarioLogin)
  }

 
  cadastrar(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('https://mybloggpersonal.herokuapp.com/usuario/cadastrar', usuario)
  }
}
