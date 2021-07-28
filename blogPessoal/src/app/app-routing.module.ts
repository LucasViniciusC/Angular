import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaCadastroComponent } from './tela-cadastro/tela-cadastro.component';
import { TelaLoginComponent } from './tela-login/tela-login.component';

const routes: Routes = [
  {path: '', redirectTo:'logar', pathMatch: 'full'},
  {path: 'logar', component: TelaLoginComponent},
  {path: 'cadastrar', component: TelaCadastroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
