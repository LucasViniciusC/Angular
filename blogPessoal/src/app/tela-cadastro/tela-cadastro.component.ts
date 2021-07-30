import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrls: ['./tela-cadastro.component.css'],
})
export class TelaCadastroComponent implements OnInit {
  usuario: Usuario = new Usuario();
  confirmarSenha: string;
  tipoUsuarios: string;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit() {
    window.scroll(0, 0);
  }

  confirmaSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  tipoUsuario(event: any) {
    this.tipoUsuarios = event.target.value;
  }

  cadastrar() {
    this.usuario.tipo = this.tipoUsuarios;

    if (this.usuario.senha != this.confirmarSenha) {
      alert('Senhas não conferem!!');
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;
        this.router.navigate(['/logar'])
        alert('Usuário cadastratado com sucesso!');
      }, erro =>{
        if(erro.status == 400){
          alert('Usuário já cadastrado!')
        }
      });
    }
  }
}
