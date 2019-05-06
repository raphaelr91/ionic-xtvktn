import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private uid: string;
  private email: string;
  private pws: string;

  constructor(
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }


  ngOnInit() {
  }


  onSubmit(form) {
    //console.log(form);
    this.login();
  }


  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pws)
      .then(
        res => {
          //console.log(res);
          //this.uid = res.user.uid;
          this.router.navigate(['/']);
        },
        err => {
          console.log(err);
          this.presentAlert("Opss!", "Usuário não encontrado!");
        }
      ).catch(
        erros => {
          this.presentAlert("Erro no Sistema!", "Não foi possivel conectar!");
        }
      )
  }


  logout() {
    //this.uid = null;
    this.usuarioService.logout();
  }


  addUser() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.pws)
      .then(
        ok => {
          this.presentAlert("OK!", "Usuário cadastrado!");
        },
        err => {
          this.presentAlert("Opss!", "E-mail ou senhas invalidas para autenticação! Tente novamente.");
        }
      )
  }


  loginG() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(
        res => {
          console.log(res);
          //this.uid = res.user.uid;
          this.router.navigate(['/']);
        }
      );
  }


  //Alerts---------------------------------
  async presentAlert(tipo: string, texto: string) {
    const alert = await this.alertController.create({
      header: tipo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });

    await alert.present();
  }
}
