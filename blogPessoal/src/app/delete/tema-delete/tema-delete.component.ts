import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css'],
})
export class TemaDeleteComponent implements OnInit {
  tema: Tema = new Tema();
  idTema: number;
  constructor(
    private service: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/home']);
    }

    this.idTema = this.route.snapshot.params['id'];
    this.findById(this.idTema);
  }

  findById(id: number) {
    this.service.getById(id).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

  deletar() {
    this.service.deleteTema(this.idTema).subscribe(() => {
      this.router.navigate(['/tema']);
      Swal.fire({
        title: 'O Tema entrou em um Buraco Negro!',
        width: 450,
        padding: '3em',
        timer: 2500,
        backdrop: `
          #000
          url("https://i.imgur.com/l8yhuC7.gif")
          center top
          no-repeat
        `
      })
    });
  }
}
