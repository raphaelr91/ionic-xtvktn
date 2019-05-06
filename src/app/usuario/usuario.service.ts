import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.validar();
  }

  public validar(): Usuario {
    this.usuario = new Usuario;

    this.usuario.foto = "assets/user.jpg";
    this.usuario.nome = "Usuário";

    this.afAuth.user.subscribe(
      res => {
        if (res) {
          this.usuario.uid = res.uid;
          this.usuario.nome = res.displayName;
          this.usuario.email = res.email;
          this.usuario.foto = res.photoURL;
          this.usuario.ativo = res.emailVerified;
          this.usuario.pws = null;
        }
      }
    );
    return this.usuario;
  }

  public logout(): Usuario {
    this.afAuth.auth.signOut();

    this.usuario = new Usuario;

    this.usuario.foto = "assets/user.jpg";
    this.usuario.nome = "Usuário";

    this.router.navigate(['/']);
    return this.usuario;
  }

}
