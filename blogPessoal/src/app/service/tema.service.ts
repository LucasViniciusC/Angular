import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';


@Injectable({
  providedIn: 'root'
})
export class TemaService {
  
  constructor(private http: HttpClient, private router: Router) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllTema(): Observable<Tema[]> {
    return this.http.get<Tema[]>('https://mybloggpersonal.herokuapp.com/tema/consulta', this.token);
  }

  postTema(tema: Tema): Observable<Tema>{
    return this.http.post<Tema>('https://mybloggpersonal.herokuapp.com/tema/novotema', tema, this.token)
  }
}
