import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tema: Tema = new Tema();
  listaTema: Tema[];
  idTema: number;

  usuario: Usuario = new Usuario();
  idUsuario = environment.id

  postagem: Postagem = new Postagem();
  listaPostagem: Postagem[];


  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private usuarioService: AuthService
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/logar']);
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Sua conexão inspirou!',
      });
    }
    this.getAllTema();
    this.getAllPostagem()
  }

  getAllTema() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTema = resp;
    });
  }

  getAllPostagem(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[])=>{
      this.listaPostagem = resp
    })
  }


  publicar(){
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema

    this.usuario.id = this.idUsuario;
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      Swal.fire({
        icon: 'success',
        title: 'Perfeito',
        text: 'Postagem Realizada com sucesso!!',
      });
      this.postagem = new Postagem();
      this.getAllPostagem()
    },
    (erro)=>{
      if(erro.status = 500){
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
          icon: 'error',
          title: 'Algum campo não foi preenchido corretamente'
        })
      }
    }
    )
  }
  findByIdTema(){
    this.temaService.getById(this.idTema).subscribe((resp: Tema)=>{
      this.tema = resp;
    })
  }
}
