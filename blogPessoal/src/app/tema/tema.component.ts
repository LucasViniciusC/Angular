import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(){

    // if(environment.token == ''){
    //   this.router.navigate(['/logar'])
    //   Swal.fire({
    //     icon: 'info',
    //     title: 'Oops...',
    //     text: 'Sua conexão inspirou!',
    //   });
    // }
  }
}
