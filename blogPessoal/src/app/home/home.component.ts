import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(){

    if(environment.token == ''){
      this.router.navigate(['/logar'])
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Sua conexão inspirou!',
      });
    }
  }
}
