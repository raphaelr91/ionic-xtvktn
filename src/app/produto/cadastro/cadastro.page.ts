import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto';
import { Router } from '@angular/router';
import { ProdutoService } from '../produto.service';
import { AlertController } from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  produto: Produto;
  key: string;

  constructor(private router: Router, private produtoService: ProdutoService, private alertController: AlertController,
    private camera: Camera) { }
  slideOpts = {
    slidePerView: 3,
    initialSlide: 1,
    speed: 400
  };

  ngOnInit() {
    this.produto = new Produto;
  }

  onSubmit() {
    if (this.key) {
      this.produtoService.update(this.produto, this.key);
      this.produto = new Produto();
    } else {
      this.produtoService.insert(this.produto);
    }
    this.router.navigate(["/"]);

    this.produto = new Produto();
  }

  //Camera
  async getPhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = "data:image/jpeg;base64," + imageData;
        this.produto.fotos.push(base64Image);
      },
      err => {
        console.log(err);
      }
    );
  }
}
