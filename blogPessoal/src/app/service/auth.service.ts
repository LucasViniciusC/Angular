import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
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

  logado(){
    let logado: boolean = false;

    if(environment.token != ''){
      logado = true;
    }

    return logado;
  }
}
