import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root',
})
export class PostagemService {
  postagem: Postagem = new Postagem();
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPostagem(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>('https://mybloggpersonal.herokuapp.com/api/listarpostagem', this.token)
  }

  postPostagem(postagem: Postagem): Observable<Postagem>{
    return this.http.post<Postagem>('https://mybloggpersonal.herokuapp.com/api/postagem', postagem, this.token)
  }

  
}
