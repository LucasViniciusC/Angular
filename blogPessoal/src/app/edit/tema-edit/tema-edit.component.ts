import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {
  tema: Tema = new Tema();
  
  constructor(private service: TemaService ,private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){ 
    if(environment.token == ''){
      this.router.navigate(['/home'])
    }
    let id = this.route.snapshot.params['id'];
    this.findByIdTema(id);
  }

  findByIdTema(id: number){
    this.service.getById(id).subscribe((resp: Tema)=>{
      this.tema = resp;
    })
  }

  atualizar(){
    this.service.putTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp;
      this.router.navigate(['/tema'])
      Swal.fire({
        icon: 'success',
        title: 'Perfeito',
        text: 'Tema alterado com sucesso!',
      });
    },
    (erro)=>{
      if(erro.status == 500){
        Swal.fire({
          icon: 'error',
          title: 'Descrição muito curta',
          text: 'Use no mínimo 5 Caracteres!',
        });
      }
    }
    )
  }
}
