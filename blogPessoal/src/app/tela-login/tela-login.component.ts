import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.css']
})
export class TelaLoginComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin();

  
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  logar(){
    this.auth.logar(this.usuarioLogin).subscribe((resp: UsuarioLogin) =>{

      environment.nome = this.usuarioLogin.nome
      environment.token = this.usuarioLogin.token
      environment.foto = this.usuarioLogin.foto

      console.log(environment.nome)
      console.log(environment.token)
      console.log(environment.foto )
      
      this.usuarioLogin = resp
      this.router.navigate(['/home'])
    }, erro =>{
      if(erro.status == 500){
        alert('E-mail ou senha estão incorretos!!')
      }
    })
  }
}
