import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
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
      this.usuarioLogin = resp
      environment.nome = this.usuarioLogin.nome
      environment.token = this.usuarioLogin.token
      environment.foto = this.usuarioLogin.foto
      environment.id = this.usuarioLogin.id

      console.log(environment.nome)
      console.log(environment.token)
      console.log(environment.foto )
      console.log(environment.id)
      
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'success',
        title: 'Acesso autorizado!'
      })
      this.router.navigate(['/home'])
    }, erro =>{
      if(erro.status == 500){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timerProgressBar: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'error',
          title: 'Usuário ou senha estão incorretos!'
        })
      }
    })
  }
}
